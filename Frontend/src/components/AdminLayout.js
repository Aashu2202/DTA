import React from 'react';
import { Outlet, Navigate, Link, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
  const token = localStorage.getItem('adminToken');
  const navigate = useNavigate();

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-slate-800">
          D-Table Admin
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/admin/jobs"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-800 hover:text-white"
          >
            Manage Jobs
          </Link>
          <Link
            to="/admin/services"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-800 hover:text-white"
          >
            Manage Services
          </Link>
          <Link
            to="/admin/faqs"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-800 hover:text-white"
          >
            Manage FAQs
          </Link>
          <Link
            to="/admin/testimonials"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-800 hover:text-white"
          >
            Manage Testimonials
          </Link>
          <Link
            to="/admin/stats"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-800 hover:text-white"
          >
            Manage Stats
          </Link>
          {/* Future CMS modules can be added here */}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow flex justify-between items-center p-4">
          <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-red-500 transition font-medium"
          >
            Logout
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
