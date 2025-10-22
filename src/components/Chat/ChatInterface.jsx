import React, { useState, useRef, useEffect } from 'react';
import { chatService } from '../../services/api';

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [conversationId, setConversationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Faire défiler vers le bas automatiquement
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Envoyer un message
  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || loading) return;

    const userMessage = {
      id: Date.now(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);

    try {
      const response = await chatService.sendMessage({
        conversationId,
        message: inputMessage,
        category: 'technical_support'
      });

      // Mettre à jour l'ID de conversation si c'est une nouvelle
      if (response.conversationId && !conversationId) {
        setConversationId(response.conversationId);
      }

      // Ajouter la réponse de l'IA
      const aiMessage = {
        id: response.aiMessage.id,
        content: response.aiMessage.content,
        role: 'assistant',
        timestamp: new Date(response.aiMessage.createdAt),
        tokensUsed: response.aiMessage.tokensUsed
      };

      setMessages(prev => [...prev, aiMessage]);
      
    } catch (error) {
      console.error('Erreur envoi message:', error);
      
      // Message d'erreur
      const errorMessage = {
        id: Date.now() + 1,
        content: 'Désolé, une erreur est survenue. Veuillez réessayer.',
        role: 'system',
        timestamp: new Date(),
        isError: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Effacer la conversation
  const clearConversation = () => {
    setMessages([]);
    setConversationId(null);
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col">
      {/* En-tête du chat */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assistant IA</h1>
          <p className="text-gray-600">Posez vos questions sur les assurances</p>
        </div>
        <button
          onClick={clearConversation}
          className="btn-secondary"
          disabled={messages.length === 0}
        >
          Nouvelle conversation
        </button>
      </div>

      {/* Zone des messages */}
      <div className="flex-1 overflow-y-auto mb-4 bg-white rounded-lg border border-gray-200 p-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun message</h3>
              <p className="mt-1 text-sm text-gray-500">Commencez une conversation avec l'assistant IA.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
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
                      : message.isError
                      ? 'bg-red-100 text-red-800 border border-red-200'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  {message.tokensUsed && (
                    <div className="text-xs opacity-70 mt-1">
                      {message.tokensUsed} tokens utilisés
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 rounded-lg px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span>L'assistant réfléchit...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Zone de saisie */}
      <form onSubmit={sendMessage} className="flex space-x-4">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Posez votre question sur les assurances..."
          className="input-field flex-1"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={!inputMessage.trim() || loading}
          className="btn-primary whitespace-nowrap"
        >
          {loading ? 'Envoi...' : 'Envoyer'}
        </button>
      </form>

      {/* Indicateur de conversation */}
      {conversationId && (
        <div className="mt-2 text-xs text-gray-500 text-center">
          Conversation ID: {conversationId}
        </div>
      )}
    </div>
  );
}

export default ChatInterface;
