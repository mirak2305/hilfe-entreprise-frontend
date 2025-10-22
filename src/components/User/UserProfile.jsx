import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

function UserProfile() {
  const { user, changePassword } = useAuth();
  const [activeTab, setActiveTab] = useState('info');
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordMessage, setPasswordMessage] = useState('');

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordMessage('');

    // Validation
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage('Les mots de passe ne correspondent pas');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordMessage('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    try {
      const result = await changePassword(
        passwordForm.currentPassword,
        passwordForm.newPassword
      );

      if (result.success) {
        setPasswordMessage('Mot de passe modifié avec succès');
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        setPasswordMessage(result.error);
      }
    } catch (error) {
      setPasswordMessage('Erreur lors du changement de mot de passe');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Jamais';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Mon Profil</h1>

      {/* Navigation par onglets */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('info')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'info'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Informations personnelles
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'password'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Changer le mot de passe
          </button>
        </nav>
      </div>

      {/* Contenu des onglets */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {activeTab === 'info' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Informations personnelles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet
                </label>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  {user?.first_name} {user?.last_name}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  {user?.email}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rôle
                </label>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 capitalize">
                  {user?.role?.replace('_', ' ')}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Statut
                </label>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 capitalize">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user?.status === 'active' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user?.status === 'active' ? 'Actif' : 'Inactif'}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID RH
                </label>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  {user?.hr_id || 'Non défini'}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dernière connexion
                </label>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  {formatDate(user?.last_login)}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-md font-medium text-gray-900 mb-2">À propos de votre compte</h3>
              <p className="text-sm text-gray-600">
                Votre compte vous permet d'accéder à l'assistant IA HILFE Enterprise.
                Pour toute modification de vos informations personnelles, contactez votre administrateur.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'password' && (
          <div className="max-w-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Changer le mot de passe</h2>
            
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe actuel
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm(prev => ({
                    ...prev,
                    currentPassword: e.target.value
                  }))}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm(prev => ({
                    ...prev,
                    newPassword: e.target.value
                  }))}
                  className="input-field"
                  required
                  minLength={6}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmer le nouveau mot de passe
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm(prev => ({
                    ...prev,
                    confirmPassword: e.target.value
                  }))}
                  className="input-field"
                  required
                  minLength={6}
                />
              </div>

              {passwordMessage && (
                <div className={`p-3 rounded-lg ${
                  passwordMessage.includes('succès') 
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {passwordMessage}
                </div>
              )}

              <button
                type="submit"
                className="btn-primary"
                disabled={!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword}
              >
                Changer le mot de passe
              </button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Conseils de sécurité</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Utilisez au moins 6 caractères</li>
                <li>• Combinez lettres, chiffres et caractères spéciaux</li>
                <li>• N'utilisez pas de mots de passe facilement devinables</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
