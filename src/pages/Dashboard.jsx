import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import ChatInterface from '../components/Chat/ChatInterface';
import ConversationHistory from '../components/Chat/ConversationHistory';
import UserProfile from '../components/User/UserProfile';
import AdminPanel from '../components/Admin/AdminPanel';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('chat');
  const { user } = useAuth();

  // Composants pour chaque onglet
  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatInterface />;
      case 'history':
        return <ConversationHistory />;
      case 'profile':
        return <UserProfile />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <ChatInterface />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* En-tête */}
      <Header />
      
      {/* Contenu principal */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Contenu dynamique */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
