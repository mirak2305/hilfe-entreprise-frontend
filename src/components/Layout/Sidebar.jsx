import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

function Sidebar({ activeTab, setActiveTab }) {
  const { user } = useAuth();

  const menuItems = [
    {
      id: 'chat',
      name: 'Chat IA',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      visible: true
    },
    {
      id: 'history',
      name: 'Historique',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      visible: true
    },
    {
      id: 'profile',
      name: 'Mon Profil',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      visible: true
    },
    {
      id: 'admin',
      name: 'Administration',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      visible: user?.role === 'company_admin' || user?.role === 'super_admin'
    }
  ];

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      {/* Logo réduit */}
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">H</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems
          .filter(item => item.visible)
          .map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </button>
          ))}
      </nav>

      {/* Information compagnie */}
      <div className="px-4 py-4 border-t border-gray-700">
        <p className="text-xs text-gray-400">
          Connecté à
        </p>
        <p className="text-sm font-medium text-white truncate">
          {user?.company_id ? `Compagnie ${user.company_id}` : 'Administration'}
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
