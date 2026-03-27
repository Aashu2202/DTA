import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FAQsManager = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/v1/faqs/admin/all', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch FAQs');
      const data = await response.json();
      setFaqs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this FAQ?')) return;
    
    try {
      const response = await fetch(`/api/v1/faqs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      if (!response.ok) throw new Error('Failed to delete FAQ');
      fetchFaqs(); // Refresh list
    } catch (err) {
      alert(err.message);
    }
  };

  const toggleStatus = async (faq) => {
    const newStatus = faq.status === 'Active' ? 'Inactive' : 'Active';
    try {
      const response = await fetch(`/api/v1/faqs/${faq.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (!response.ok) throw new Error('Failed to update status');
      fetchFaqs(); // Refresh list
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="p-8 text-gray-500">Loading FAQs...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">FAQs Management</h1>
        <Link
          to="/admin/faqs/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700 transition font-medium"
        >
          + Add New FAQ
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Order</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Question</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {faqs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-10 text-center text-gray-400">No FAQs found. Start by adding one!</td>
                </tr>
              ) : (
                faqs.map((faq) => (
                  <tr key={faq.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                      {faq.order}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium max-w-md truncate">
                      {faq.question}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button 
                        onClick={() => toggleStatus(faq)}
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer transition-all ${
                          faq.status === 'Active' 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {faq.status}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link to={`/admin/faqs/edit/${faq.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</Link>
                      <button onClick={() => handleDelete(faq.id)} className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <p className="mt-4 text-gray-500 text-xs italic">
        * FAQs are displayed on the public site sorted by 'Order' (ascending). Only 'Active' FAQs are visible.
      </p>
    </div>
  );
};

export default FAQsManager;
