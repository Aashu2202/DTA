import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import DOMPurify from 'dompurify';
import 'react-quill/dist/quill.snow.css';
import { API_BASE_URL } from '../../config';

const JobForm = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    experience: '',
    employment_type: 'Full-Time',
    description: '',
    requirements: '', // comma separated string for simple input
    status: 'Active',
    apply_link_or_email: ''
  });

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditing) {
      const fetchJob = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/api/v1/jobs/${id}`);
          if (!response.ok) throw new Error('Failed to fetch job details');
          const data = await response.json();
          setFormData({
            ...data,
            requirements: data.requirements ? data.requirements.join('\n') : ''
          });
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchJob();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (content) => {
    setFormData(prev => ({ ...prev, description: content }));
  };

  const prepareContent = (html) => {
    // 1. Sanitize before processing
    let clean = DOMPurify.sanitize(html);

    // 2. Remove empty tags like <p><br></p>, <h1><br></h1>, etc.
    // This regex looks for tags containing only whitespace or <br>
    clean = clean.replace(/<(p|h[1-6]|li)>(?:\s|&nbsp;|<br\s*\/?>)*<\/\1>/gi, '');

    return clean.trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      ...formData,
      description: prepareContent(formData.description),
      requirements: formData.requirements.split('\n').map(r => r.trim()).filter(r => r)
    };

    const url = isEditing ? `${API_BASE_URL}/api/v1/jobs/${id}` : `${API_BASE_URL}/api/v1/jobs`;
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to save job');
      navigate('/admin/jobs');
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  if (loading) return <div className="text-gray-500">Loading job details...</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{isEditing ? 'Edit Job' : 'Add New Job'}</h2>
        <Link to="/admin/jobs" className="text-gray-500 hover:text-gray-700">Cancel</Link>
      </div>

      {error && <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Job Title</label>
            <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. Data Scientist" />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Department</label>
            <input type="text" name="department" required value={formData.department} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. Engineering" />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Location</label>
            <input type="text" name="location" required value={formData.location} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. Mumbai / Remote" />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Experience</label>
            <input type="text" name="experience" required value={formData.experience} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. 3-5 Years" />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Employment Type</label>
            <select name="employment_type" value={formData.employment_type} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500">
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Status</label>
            <select name="status" value={formData.status} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500">
              <option value="Active">Active (Published)</option>
              <option value="Closed">Closed (Hidden)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Apply Link or Email</label>
          <input type="text" name="apply_link_or_email" required value={formData.apply_link_or_email} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. hr@dtableanalytics.com or https://forms.gle/..." />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Job Description</label>
          <div className="bg-white rounded-md">
            <ReactQuill
              theme="snow"
              value={formData.description}
              onChange={handleDescriptionChange}
              modules={{
                toolbar: [
                  [{ 'header': [1, 2, false] }],
                  ['bold', 'italic', 'underline'],
                  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                  ['clean']
                ],
              }}
              formats={[
                'header',
                'bold', 'italic', 'underline',
                'list', 'bullet'
              ]}
              placeholder="Enter full job description here..."
              className="h-64 mb-12"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Requirements / Responsibilities (One per line)</label>
          <textarea name="requirements" required rows="5" value={formData.requirements} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Must know Python&#10;Experience with Machine Learning&#10;Good communication skills"></textarea>
          <p className="text-xs text-gray-500 mt-1">Each line will be shown as a bullet point on the Careers page.</p>
        </div>

        <div className="flex justify-end pt-4">
          <button type="submit" disabled={saving} className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition disabled:opacity-50 font-semibold">
            {saving ? 'Saving...' : 'Save Job'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
