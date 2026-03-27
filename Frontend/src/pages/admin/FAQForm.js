import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { API_BASE_URL } from '../../config';

const FAQForm = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    order: 0,
    status: 'Active'
  });

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditing) {
      const fetchFAQ = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/api/v1/faqs/${id}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
          });
          if (!response.ok) throw new Error('Failed to fetch FAQ details');
          const data = await response.json();
          setFormData({
            question: data.question,
            answer: data.answer,
            order: data.order,
            status: data.status
          });
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchFAQ();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'order' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const url = isEditing ? `${API_BASE_URL}/api/v1/faqs/${id}` : `${API_BASE_URL}/api/v1/faqs`;
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(formData)
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.detail || 'Failed to save FAQ');
      }
      navigate('/admin/faqs');
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-gray-500">Loading FAQ details...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{isEditing ? 'Edit FAQ' : 'Add New FAQ'}</h2>
          <p className="text-gray-500 text-sm mt-1">Manage public frequently asked questions.</p>
        </div>
        <Link to="/admin/faqs" className="text-gray-500 hover:text-gray-700 font-medium">Cancel</Link>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Question</label>
          <input
            type="text"
            name="question"
            required
            value={formData.question}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            placeholder="e.g. How do I get started?"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Answer</label>
          <textarea
            name="answer"
            required
            rows="5"
            value={formData.answer}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            placeholder="Provide a clear and concise answer..."
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Display Order</label>
            <input
              type="number"
              name="order"
              required
              value={formData.order}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              placeholder="e.g. 1"
            />
            <p className="mt-1 text-xs text-gray-400 font-medium">Lower numbers appear first.</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            >
              <option value="Active">Active (Publicly Visible)</option>
              <option value="Inactive">Inactive (Hidden)</option>
            </select>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className={`bg-indigo-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition font-bold ${saving ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {saving ? 'Saving...' : (isEditing ? 'Update FAQ' : 'Create FAQ')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FAQForm;
