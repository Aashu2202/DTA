import React, { useState, useEffect } from 'react';
import { FaUsers, FaFileAlt, FaCheckCircle, FaClock, FaTrophy, FaBolt, FaShieldAlt, FaGlobe, FaTrash, FaPlus, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const ICON_OPTIONS = [
  { key: 'users', label: 'Users/Clients', icon: <FaUsers /> },
  { key: 'file', label: 'File/Reports', icon: <FaFileAlt /> },
  { key: 'check', label: 'Check/Accuracy', icon: <FaCheckCircle /> },
  { key: 'clock', label: 'Clock/Uptime', icon: <FaClock /> },
  { key: 'trophy', label: 'Trophy/Awards', icon: <FaTrophy /> },
  { key: 'bolt', label: 'Bolt/Speed', icon: <FaBolt /> },
  { key: 'shield', label: 'Shield/Security', icon: <FaShieldAlt /> },
  { key: 'globe', label: 'Globe/Global', icon: <FaGlobe /> },
];

const StatsManager = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/v1/stats/admin', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch stats');
      const data = await response.json();
      setItems(data.items || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const addItem = () => {
    const newItem = {
      label: 'New Stat',
      value: 0,
      suffix: '',
      icon: 'users',
      highlight: false,
      description: '',
      order: items.length + 1,
      status: 'Active'
    };
    setItems([...items, newItem]);
  };

  const removeItem = (index) => {
    if (!window.confirm('Remove this stat item?')) return;
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const moveItem = (index, direction) => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === items.length - 1) return;

    const newItems = [...items];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
    
    // Update order values
    const finalItems = newItems.map((item, idx) => ({ ...item, order: idx + 1 }));
    setItems(finalItems);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch('/api/v1/stats/admin', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ items })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Failed to save stats');
      }

      setMessage('Stats updated successfully!');
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-gray-500">Loading Stats...</div>;

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Website Stats</h1>
          <p className="text-gray-500 text-sm mt-1">Configure the numbers shown in the impact section.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition font-bold ${saving ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
          {error}
        </div>
      )}

      {message && (
        <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 text-sm">
          {message}
        </div>
      )}

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className={`bg-white p-6 rounded-xl border border-gray-100 shadow-sm transition-all ${item.status === 'Inactive' ? 'opacity-60 grayscale' : ''}`}>
            <div className="flex flex-wrap gap-4 items-start">
              {/* Order and Controls */}
              <div className="flex flex-col gap-2">
                <button onClick={() => moveItem(index, 'up')} className="p-1 hover:text-indigo-600 transition-colors" title="Move Up"><FaArrowUp /></button>
                <div className="text-center font-bold text-gray-400">{index + 1}</div>
                <button onClick={() => moveItem(index, 'down')} className="p-1 hover:text-indigo-600 transition-colors" title="Move Down"><FaArrowDown /></button>
              </div>

              {/* Main Fields */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Label</label>
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => handleItemChange(index, 'label', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="e.g. Clients"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Value (Number)</label>
                  <input
                    type="number"
                    value={item.value}
                    onChange={(e) => handleItemChange(index, 'value', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="e.g. 500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Suffix</label>
                  <input
                    type="text"
                    value={item.suffix}
                    onChange={(e) => handleItemChange(index, 'suffix', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="e.g. +, %, /7"
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Icon</label>
                  <div className="flex gap-2 items-center">
                    <div className="p-2 bg-gray-50 rounded text-indigo-600 text-xl">
                      {ICON_OPTIONS.find(opt => opt.key === item.icon)?.icon || <FaGlobe />}
                    </div>
                    <select
                      value={item.icon}
                      onChange={(e) => handleItemChange(index, 'icon', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                      {ICON_OPTIONS.map(opt => (
                        <option key={opt.key} value={opt.key}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="md:col-span-1 flex items-center gap-6 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.highlight}
                      onChange={(e) => handleItemChange(index, 'highlight', e.target.checked)}
                      className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Highlight Card</span>
                  </label>
                  
                  <select
                    value={item.status}
                    onChange={(e) => handleItemChange(index, 'status', e.target.value)}
                    className={`text-sm font-semibold rounded-full px-3 py-1 border-none outline-none cursor-pointer ${
                      item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="md:col-span-1 flex justify-end pt-6">
                  <button
                    onClick={() => removeItem(index)}
                    className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm font-medium transition-colors"
                  >
                    <FaTrash size={14} /> Remove
                  </button>
                </div>

                <div className="md:col-span-3">
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Description (Optional)</label>
                  <textarea
                    value={item.description || ''}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    rows="1"
                    placeholder="Brief description of this stat..."
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addItem}
          className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 font-bold"
        >
          <FaPlus /> Add New Stat Item
        </button>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className={`bg-indigo-600 text-white px-10 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition font-bold text-lg ${saving ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>
    </div>
  );
};

export default StatsManager;
