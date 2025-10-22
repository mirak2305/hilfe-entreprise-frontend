import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('hilfe_token'));

  // Vérifier si l'utilisateur est connecté au chargement
  useEffect(() => {
    const checkAuth = async () => {
      const savedToken = localStorage.getItem('hilfe_token');
      if (savedToken) {
        try {
          const userData = await authService.getMe(savedToken);
          setUser(userData);
          setToken(savedToken);
        } catch (error) {
          console.error('Erreur de vérification auth:', error);
          localStorage.removeItem('hilfe_token');
          setToken(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Fonction de connexion
  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      
      if (response.token && response.user) {
        localStorage.setItem('hilfe_token', response.token);
        setToken(response.token);
        setUser(response.user);
        return { success: true, user: response.user };
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      return { 
        success: false, 
        error: error.response?.data?.error || 'Erreur de connexion' 
      };
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem('hilfe_token');
    setToken(null);
    setUser(null);
  };

  // Fonction changement mot de passe
  const changePassword = async (currentPassword, newPassword) => {
    try {
      await authService.changePassword(token, currentPassword, newPassword);
      return { success: true };
    } catch (error) {
      console.error('Erreur changement mot de passe:', error);
      return { 
        success: false, 
        error: error.response?.data?.error || 'Erreur lors du changement de mot de passe' 
      };
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    changePassword,
    isAuthenticated: !!user && !!token,
    isAdmin: user?.role === 'company_admin' || user?.role === 'super_admin',
    isSuperAdmin: user?.role === 'super_admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
