import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import AdminPanel from '../components/Admin/AdminPanel';

function AdminDashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  // Rediriger si pas admin
  React.useEffect(() => {
    if (!loading && isAuthenticated) {
      if (user?.role !== 'super_admin' && user?.role !== 'company_admin') {
        navigate('/dashboard');
      }
    }
  }, [user, isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!isAuthenticated || (user?.role !== 'super_admin' && user?.role !== 'company_admin')) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Accès non autorisé</h1>
          <p className="text-gray-600 mt-2">Vous n'avez pas les droits pour accéder à cette page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab="admin" setActiveTab={() => {}} />
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <AdminPanel />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
