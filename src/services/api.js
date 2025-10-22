import axios from 'axios';

// Configuration de base axios
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token aux requêtes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('hilfe_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem('hilfe_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Service d'authentification
export const authService = {
  // Connexion
  async login(email, password) {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  },

  // Récupérer le profil utilisateur
  async getMe(token = null) {
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const response = await api.get('/api/auth/me', config);
    return response.data.user;
  },

  // Changer le mot de passe
  async changePassword(token, currentPassword, newPassword) {
    const response = await api.post(
      '/api/auth/change-password',
      { currentPassword, newPassword },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  },
};

// Service admin
export const adminService = {
  // Compagnies
  async getCompanies() {
    const response = await api.get('/api/admin/companies');
    return response.data;
  },

  async createCompany(companyData) {
    const response = await api.post('/api/admin/companies', companyData);
    return response.data;
  },

  // Utilisateurs
  async getCompanyUsers(companyId) {
    const response = await api.get(`/api/admin/companies/${companyId}/users`);
    return response.data;
  },

  async createUser(userData) {
    const response = await api.post('/api/admin/users', userData);
    return response.data;
  },

  // Pays
  async getCountries() {
    const response = await api.get('/api/admin/countries');
    return response.data;
  },
};

// Service chat
export const chatService = {
  // Envoyer un message
  async sendMessage(messageData) {
    const response = await api.post('/api/chat/message', messageData);
    return response.data;
  },

  // Récupérer les conversations
  async getConversations() {
    const response = await api.get('/api/chat/conversations');
    return response.data;
  },

  // Récupérer les messages d'une conversation
  async getConversationMessages(conversationId) {
    const response = await api.get(`/api/chat/conversations/${conversationId}/messages`);
    return response.data;
  },
};

// Service santé
export const healthService = {
  async checkHealth() {
    const response = await api.get('/health');
    return response.data;
  },
};

export default api;
