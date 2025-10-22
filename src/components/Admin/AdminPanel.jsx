import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const AdminPanel = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Panel Administrateur</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Bonjour, {user?.name || 'Admin'}</span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>

        {/* Contenu du panel admin */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Carte Statistiques */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Statistiques</h3>
            <div className="space-y-2">
              <p className="text-gray-600">Utilisateurs: <span className="font-bold">150</span></p>
              <p className="text-gray-600">Commandes: <span className="font-bold">45</span></p>
              <p className="text-gray-600">Revenus: <span className="font-bold">€2,540</span></p>
            </div>
          </div>

          {/* Carte Actions Rapides */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Actions Rapides</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
                Gérer les Utilisateurs
              </button>
              <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded">
                Voir les Rapports
              </button>
              <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded">
                Paramètres
              </button>
            </div>
          </div>

          {/* Carte Activité Récente */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Activité Récente</h3>
            <div className="space-y-3">
              <div className="border-l-4 border-blue-500 pl-3">
                <p className="text-sm">Nouvel utilisateur inscrit</p>
                <p className="text-xs text-gray-500">Il y a 5 min</p>
              </div>
              <div className="border-l-4 border-green-500 pl-3">
                <p className="text-sm">Commande #1234 complétée</p>
                <p className="text-xs text-gray-500">Il y a 15 min</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
