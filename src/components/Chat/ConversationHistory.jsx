import React, { useState, useEffect } from 'react';
import { chatService } from '../../services/api';

function ConversationHistory() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les conversations au montage
  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      setLoading(true);
      const data = await chatService.getConversations();
      setConversations(data);
    } catch (error) {
      console.error('Erreur chargement conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadConversationMessages = async (conversationId) => {
    try {
      setSelectedConversation(conversationId);
      const data = await chatService.getConversationMessages(conversationId);
      setMessages(data);
    } catch (error) {
      console.error('Erreur chargement messages:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Historique des conversations</h1>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement de l'historique...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Historique des conversations</h1>
        <button
          onClick={loadConversations}
          className="btn-secondary"
        >
          Actualiser
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste des conversations */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Conversations ({conversations.length})
            </h2>
            
            {conversations.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <p className="mt-2">Aucune conversation</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {conversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => loadConversationMessages(conversation.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      selectedConversation === conversation.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-medium text-gray-900 truncate">
                      {conversation.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {formatDate(conversation.created_at)}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Détails de la conversation sélectionnée */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {selectedConversation ? 'Détails de la conversation' : 'Sélectionnez une conversation'}
            </h2>

            {selectedConversation ? (
              messages.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
                  <p className="mt-2">Chargement des messages...</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-3/4 rounded-lg px-4 py-2 ${
                          message.role === 'user'
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <div className="whitespace-pre-wrap">{message.content}</div>
                        <div className="text-xs opacity-70 mt-1">
                          {formatDate(message.created_at)}
                          {message.tokens_used && ` • ${message.tokens_used} tokens`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="text-center py-8 text-gray-500">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <p className="mt-2">Sélectionnez une conversation pour voir les détails</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConversationHistory;
