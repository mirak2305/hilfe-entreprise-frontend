import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

function AdminPanel() {
  const { user } = useAuth();

  const adminStats = [
    {
      name: 'Utilisateurs actifs',
      value: '12',
      change: '+2',
      changeType: 'increase'
    },
    {
      name: 'Conversations aujourd\'hui',
      value: '47',
      change: '+8',
      changeType: 'increase'
    },
    {
      name: 'Tokens utilisés',
      value: '12.4k',
      change: '-1.2k',
      changeType: 'decrease'
    },
    {
      name: 'Compagnies',
      value: '3',
      change: '+0',
      changeType: 'neutral'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Administration</h1>
        <p className="text-gray-600">
          Panel de gestion pour {user?.role === 'super_admin' ? 'super administrateur' : 'administrateur'}
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {adminStats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                stat.changeType === 'increase' 
                  ? 'bg-green-100 text-green-800'
                  : stat.changeType === 'decrease'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cartes de fonctionnalités admin */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gestion des utilisateurs */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h3 className="ml-3 text-lg font-medium text-gray-900">Gestion des utilisateurs</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Créez et gérez les utilisateurs de votre compagnie.
          </p>
          <button className="btn-primary w-full">
            Gérer les utilisateurs
          </button>
        </div>

        {/* Gestion des compagnies (super admin seulement) */}
        {user?.role === 'super_admin' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="ml-3 text-lg font-medium text-gray-900">Gestion des compagnies</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Gérez toutes les compagnies de la plateforme.
            </p>
            <button className="btn-primary w-full">
              Gérer les compagnies
            </button>
          </div>
        )}

        {/* Analytics */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="ml-3 text-lg font-medium text-gray-900">Analytics</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Consultez les statistiques d'utilisation de la plateforme.
          </p>
          <button className="btn-primary w-full">
            Voir les analytics
          </button>
        </div>

        {/* Documents */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="ml-3 text-lg font-medium text-gray-900">Documents</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Gérez les documents de référence de votre compagnie.
          </p>
          <button className="btn-primary w-full">
            Gérer les documents
          </button>
        </div>
      </div>

      {/* Message de développement */}
      <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Panel en développement
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                Les fonctionnalités d'administration complètes sont en cours de développement.
                Cette interface sera enrichie prochainement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
