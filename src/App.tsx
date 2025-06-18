import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider, useNotifications } from './contexts/NotificationContext';
import AuthPage from './components/auth/AuthPage';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import StatsGrid from './components/dashboard/StatsGrid';
import NotificationList from './components/notifications/NotificationList';
import NotificationForm from './components/forms/NotificationForm';
import SettingsPage from './components/pages/SettingsPage';
import TemplatesPage from './components/pages/TemplatesPage';

const MainApp: React.FC = () => {
  const { user } = useAuth();
  const { setFilter, activeView, setActiveView } = useNotifications();
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Handle search
  useEffect(() => {
    if (searchQuery.trim()) {
      setFilter({ search: searchQuery.trim() });
      if (activeView === 'dashboard') {
        setActiveView('all');
      }
    } else {
      setFilter({});
    }
  }, [searchQuery, setFilter, activeView, setActiveView]);

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <StatsGrid />;
      case 'templates':
        return <TemplatesPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <NotificationList />;
    }
  };

  if (!user) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <div className="flex-shrink-0 overflow-y-auto custom-scrollbar">
        <Sidebar onCreateNew={() => setShowCreateForm(true)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
        />
        
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Create Form Modal */}
      {showCreateForm && (
        <NotificationForm onClose={() => setShowCreateForm(false)} />
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <MainApp />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--toast-bg)',
                color: 'var(--toast-color)',
                border: '1px solid var(--toast-border)',
              },
            }}
          />
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;