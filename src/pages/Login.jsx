import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Mode développement - authentification simulée
      if (import.meta.env.VITE_NODE_ENV === 'development') {
        console.log('Mode développement - authentification simulée');
        const mockToken = 'mock-jwt-token-' + Date.now();
        const mockUser = { 
          email, 
          name: 'Utilisateur Test', 
          role: 'admin',
          id: 1
        };
        login(mockToken, mockUser);
        return;
      }

      // Mode production - vraie API
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token, data.user);
      } else {
        setError(data.message || 'Erreur de connexion');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Connexion - {import.meta.env.VITE_APP_NAME}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Mode: {import.meta.env.VITE_NODE_ENV}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* ... reste du formulaire inchangé ... */}
        </form>
      </div>
    </div>
  );
};

export default Login;
