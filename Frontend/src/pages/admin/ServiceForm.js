import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  FiAlertCircle, FiClock, FiTrendingDown, FiDatabase, FiUserX, FiShieldOff,
  FiXCircle, FiZap, FiActivity, FiSliders, FiSearch, FiDollarSign,
  FiMessageCircle, FiRefreshCw, FiLock, FiGlobe, FiLayers, FiCheckCircle
} from 'react-icons/fi';

const ICON_MAP = {
  FiAlertCircle, FiClock, FiTrendingDown, FiDatabase, FiUserX, FiShieldOff,
  FiXCircle, FiZap, FiActivity, FiSliders, FiSearch, FiDollarSign,
  FiMessageCircle, FiRefreshCw, FiLock, FiGlobe, FiLayers, FiCheckCircle
};

const PROBLEM_ICON_OPTIONS = [
  { value: 'FiAlertCircle', label: '⚠️ Alert Circle' },
  { value: 'FiClock',        label: '🕐 Clock (Delays)' },
  { value: 'FiTrendingDown', label: '📉 Trend Down (Decline)' },
  { value: 'FiDatabase',     label: '🗄️ Database (Data Issues)' },
  { value: 'FiUserX',        label: '👤 User X (Access / HR)' },
  { value: 'FiShieldOff',    label: '🛡️ Shield Off (Security)' },
  { value: 'FiXCircle',      label: '❌ X Circle (Failure)' },
  { value: 'FiZap',          label: '⚡ Zap (Speed / Energy)' },
  { value: 'FiActivity',     label: '📊 Activity (Monitoring)' },
  { value: 'FiSliders',      label: '🎚️ Sliders (Control)' },
  { value: 'FiSearch',       label: '🔍 Search (Visibility)' },
  { value: 'FiDollarSign',   label: '💵 Dollar Sign (Cost)' },
  { value: 'FiMessageCircle',label: '💬 Message (Communication)' },
  { value: 'FiRefreshCw',    label: '🔄 Refresh (Repetition)' },
  { value: 'FiLock',         label: '🔒 Lock (Access Control)' },
  { value: 'FiGlobe',        label: '🌐 Globe (Reach)' },
  { value: 'FiLayers',       label: '📚 Layers (Complexity)' },
  { value: 'FiCheckCircle',  label: '✅ Check Circle (Compliance)' },
];

const ServiceForm = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    icon_name: '',
    shortDesc: '',
    fullDesc: '',
    image: '',
    banner: '',
    benefits: [''],
    detailContent: {
      whatIsIt: [''],
      problems: [],
      howWeHelp: [],
      processDiagram: [],
      useCases: []
    },
    status: 'Active'
  });
  
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditing) {
      const fetchService = async () => {
        try {
          const response = await fetch(`/api/v1/services/admin/all`, {
             headers: {
                 'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
             }
          });
          if (!response.ok) throw new Error('Failed to fetch services list');
          const data = await response.json();
          const serviceToEdit = data.find(s => s.id === id);
          if (serviceToEdit) {
            // Ensure array fields exist to prevent mapping errors
            setFormData({
              ...serviceToEdit,
              benefits: serviceToEdit.benefits?.length ? serviceToEdit.benefits : [''],
              detailContent: {
                whatIsIt: serviceToEdit.detailContent?.whatIsIt?.length ? serviceToEdit.detailContent.whatIsIt : [''],
                problems: serviceToEdit.detailContent?.problems || [],
                howWeHelp: serviceToEdit.detailContent?.howWeHelp || [],
                processDiagram: serviceToEdit.detailContent?.processDiagram || [],
                useCases: serviceToEdit.detailContent?.useCases || [],
              }
            });
          } else {
             throw new Error('Service not found');
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchService();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBenefitChange = (index, value) => {
    const newBenefits = [...formData.benefits];
    newBenefits[index] = value;
    setFormData(prev => ({ ...prev, benefits: newBenefits }));
  };

  const addBenefit = () => setFormData(prev => ({ ...prev, benefits: [...prev.benefits, ''] }));
  const removeBenefit = (index) => setFormData(prev => ({ ...prev, benefits: prev.benefits.filter((_, i) => i !== index) }));

  // Dynamic Handlers for detailContent Arrays
  const handleDetailChange = (section, index, field, value) => {
    setFormData(prev => {
      const newSection = [...prev.detailContent[section]];
      if (typeof newSection[index] === 'string' && field === null) {
        newSection[index] = value;
      } else {
        newSection[index] = { ...newSection[index], [field]: value };
      }
      return { ...prev, detailContent: { ...prev.detailContent, [section]: newSection } };
    });
  };

  const addDetailItem = (section, blankItem) => {
    setFormData(prev => ({
      ...prev,
      detailContent: {
        ...prev.detailContent,
        [section]: [...prev.detailContent[section], blankItem]
      }
    }));
  };

  const removeDetailItem = (section, index) => {
    setFormData(prev => ({
      ...prev,
      detailContent: {
        ...prev.detailContent,
        [section]: prev.detailContent[section].filter((_, i) => i !== index)
      }
    }));
  };

  const generateSlug = () => {
    if (formData.title) {
      const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    // Clean up empty records before submitting
    const payload = { ...formData };
    payload.benefits = payload.benefits.filter(item => item.trim() !== '');
    payload.detailContent.whatIsIt = payload.detailContent.whatIsIt.filter(item => item.trim() !== '');

    const url = isEditing ? `/api/v1/services/${id}` : '/api/v1/services';
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
      
      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.detail || 'Failed to save service');
      }
      navigate('/admin/services');
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  if (loading) return <div className="text-gray-500">Loading service details...</div>;

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-100 mb-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{isEditing ? 'Edit Full Service' : 'Add New Detailed Service'}</h2>
        <Link to="/admin/services" className="text-gray-500 hover:text-gray-700">Cancel</Link>
      </div>

      {error && <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Core Info */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">Core Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">Service Title</label>
              <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" placeholder="e.g. Business Process Automation" />
            </div>
            <div className="relative">
              <label className="block text-gray-700 font-semibold mb-2">URL Slug</label>
              <div className="flex">
                <input type="text" name="slug" required value={formData.slug} onChange={handleChange} className="w-full px-3 py-2 border rounded-l-md" placeholder="e.g. process-automation" />
                <button type="button" onClick={generateSlug} className="bg-gray-200 px-4 py-2 rounded-r-md hover:bg-gray-300 transition border-y border-r border-gray-300">Generate</button>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">React Icon Name (Optional)</label>
              <input type="text" name="icon_name" value={formData.icon_name} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" placeholder="e.g. FiZap" />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full px-3 py-2 border rounded-md">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">Short Description</label>
              <textarea name="shortDesc" required rows="2" value={formData.shortDesc} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" placeholder="Brief subtitle for the main page cards"></textarea>
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">Full Description</label>
              <textarea name="fullDesc" rows="3" value={formData.fullDesc} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" placeholder="Full summary for the Service Detail hero section"></textarea>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Front Image Path</label>
              <input type="text" name="image" value={formData.image} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" placeholder="/services/images/front.png" />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Banner Image Path</label>
              <input type="text" name="banner" value={formData.banner} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" placeholder="/services/images/banner.png" />
            </div>
          </div>
        </div>

        {/* Benefits List */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">Core Benefits</h3>
          {formData.benefits.map((benefit, index) => (
            <div key={index} className="flex gap-2 mb-3">
              <input type="text" value={benefit} onChange={(e) => handleBenefitChange(index, e.target.value)} className="w-full px-3 py-2 border rounded-md" placeholder="e.g. Reduced Operational Costs" />
              {formData.benefits.length > 1 && (
                <button type="button" onClick={() => removeBenefit(index)} className="px-3 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200">X</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addBenefit} className="text-sm font-semibold text-blue-600 hover:text-blue-800">+ Add Benefit</button>
        </div>

        {/* Detail Content - What Is It */}
        <div className="bg-blue-50/50 p-6 rounded-lg border border-blue-100">
          <h3 className="text-lg font-semibold text-indigo-900 border-b border-blue-200 pb-2 mb-4">What Is It? (Paragraphs)</h3>
          {formData.detailContent.whatIsIt.map((para, index) => (
            <div key={index} className="flex gap-2 mb-3 items-start">
              <textarea rows="3" value={para} onChange={(e) => handleDetailChange('whatIsIt', index, null, e.target.value)} className="w-full px-3 py-2 border rounded-md" placeholder="Detailed service introduction paragraph..."></textarea>
              <button type="button" onClick={() => removeDetailItem('whatIsIt', index)} className="px-3 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200">X</button>
            </div>
          ))}
          <button type="button" onClick={() => addDetailItem('whatIsIt', '')} className="text-sm font-semibold text-blue-600 hover:text-blue-800">+ Add Paragraph</button>
        </div>

        {/* Detail Content - Problems */}
        <div className="bg-blue-50/50 p-6 rounded-lg border border-blue-100">
          <h3 className="text-lg font-semibold text-indigo-900 border-b border-blue-200 pb-2 mb-4">Problems You Face</h3>
          {formData.detailContent.problems.map((prob, index) => {
            const PreviewIcon = ICON_MAP[prob.icon_name] || FiAlertCircle;
            return (
              <div key={index} className="mb-4 p-4 border bg-white rounded-md relative shadow-sm">
                <button type="button" onClick={() => removeDetailItem('problems', index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold">✕</button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Title</label>
                    <input type="text" value={prob.title} onChange={(e) => handleDetailChange('problems', index, 'title', e.target.value)} className="w-full px-2 py-1 border rounded" placeholder="Short title" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
                    <textarea rows="2" value={prob.description} onChange={(e) => handleDetailChange('problems', index, 'description', e.target.value)} className="w-full px-2 py-1 border rounded" placeholder="Explanation of the problem..."></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Icon</label>
                    <div className="flex items-center gap-3">
                      {/* Live icon preview */}
                      <div className="w-9 h-9 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 flex-shrink-0">
                        <PreviewIcon className="w-5 h-5" />
                      </div>
                      <select
                        value={prob.icon_name || 'FiAlertCircle'}
                        onChange={(e) => handleDetailChange('problems', index, 'icon_name', e.target.value)}
                        className="flex-1 px-2 py-1 border rounded text-sm"
                      >
                        {PROBLEM_ICON_OPTIONS.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <button type="button" onClick={() => addDetailItem('problems', { title: '', description: '', icon_name: 'FiAlertCircle' })} className="text-sm font-semibold text-blue-600 hover:text-blue-800">+ Add Problem</button>
        </div>

        {/* Detail Content - How We Help */}
        <div className="bg-blue-50/50 p-6 rounded-lg border border-blue-100">
          <h3 className="text-lg font-semibold text-indigo-900 border-b border-blue-200 pb-2 mb-4">How We Help (Solutions)</h3>
          {formData.detailContent.howWeHelp.map((item, index) => (
            <div key={index} className="mb-4 p-4 border bg-white rounded-md relative shadow-sm">
              <button type="button" onClick={() => removeDetailItem('howWeHelp', index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold">✕</button>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Problem Mentioned</label>
                  <input type="text" value={item.problem} onChange={(e) => handleDetailChange('howWeHelp', index, 'problem', e.target.value)} className="w-full px-2 py-1 border rounded" placeholder="e.g. Scatted Files" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Solution</label>
                  <input type="text" value={item.solution} onChange={(e) => handleDetailChange('howWeHelp', index, 'solution', e.target.value)} className="w-full px-2 py-1 border rounded" placeholder="e.g. Centralized Hubs" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Outcome</label>
                  <input type="text" value={item.outcome} onChange={(e) => handleDetailChange('howWeHelp', index, 'outcome', e.target.value)} className="w-full px-2 py-1 border rounded" placeholder="e.g. Rapid retrieval" />
                </div>
              </div>
            </div>
          ))}
          <button type="button" onClick={() => addDetailItem('howWeHelp', { problem: '', solution: '', outcome: '' })} className="text-sm font-semibold text-blue-600 hover:text-blue-800">+ Add Solution</button>
        </div>

        {/* Detail Content - Process Diagram */}
        <div className="bg-blue-50/50 p-6 rounded-lg border border-blue-100">
          <h3 className="text-lg font-semibold text-indigo-900 border-b border-blue-200 pb-2 mb-4">Process Diagram</h3>
          {formData.detailContent.processDiagram.map((item, index) => (
            <div key={index} className="flex gap-4 mb-4 p-4 border bg-white rounded-md shadow-sm relative items-start">
              <div className="w-16 flex-shrink-0">
                <label className="block text-xs font-semibold text-gray-600 mb-1">Step #</label>
                <input type="number" value={item.step} onChange={(e) => handleDetailChange('processDiagram', index, 'step', Number(e.target.value))} className="w-full px-2 py-1 border rounded" />
              </div>
              <div className="flex-1 space-y-3 pt-1">
                 <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Title</label>
                    <input type="text" value={item.title} onChange={(e) => handleDetailChange('processDiagram', index, 'title', e.target.value)} className="w-full px-2 py-1 border rounded" placeholder="e.g. Discovery & Audit" />
                 </div>
                 <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
                    <input type="text" value={item.description} onChange={(e) => handleDetailChange('processDiagram', index, 'description', e.target.value)} className="w-full px-2 py-1 border rounded" placeholder="Explain this step..." />
                 </div>
              </div>
              <button type="button" onClick={() => removeDetailItem('processDiagram', index)} className="mt-6 px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200">X</button>
            </div>
          ))}
          <button type="button" onClick={() => addDetailItem('processDiagram', { step: formData.detailContent.processDiagram.length + 1, title: '', description: '' })} className="text-sm font-semibold text-blue-600 hover:text-blue-800">+ Add Step</button>
        </div>

        {/* Detail Content - Use Cases */}
        <div className="bg-blue-50/50 p-6 rounded-lg border border-blue-100">
          <h3 className="text-lg font-semibold text-indigo-900 border-b border-blue-200 pb-2 mb-4">Use Cases</h3>
          {formData.detailContent.useCases.map((item, index) => (
            <div key={index} className="mb-4 p-4 border bg-white rounded-md relative shadow-sm">
              <button type="button" onClick={() => removeDetailItem('useCases', index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold">✕</button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Title</label>
                  <input type="text" value={item.title} onChange={(e) => handleDetailChange('useCases', index, 'title', e.target.value)} className="w-full px-2 py-1 border rounded" placeholder="e.g. Invoice Processing" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Scenario</label>
                  <textarea rows="2" value={item.scenario} onChange={(e) => handleDetailChange('useCases', index, 'scenario', e.target.value)} className="w-full px-2 py-1 border rounded" placeholder="Scenario details..."></textarea>
                </div>
              </div>
            </div>
          ))}
          <button type="button" onClick={() => addDetailItem('useCases', { title: '', scenario: '' })} className="text-sm font-semibold text-blue-600 hover:text-blue-800">+ Add Use Case</button>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4 border-t border-gray-200 mt-8 pt-6">
          <button type="submit" disabled={saving} className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition disabled:opacity-50 font-bold text-lg">
            {saving ? 'Saving to Database...' : 'Save Full Service'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;
