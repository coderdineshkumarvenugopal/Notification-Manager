import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  updatePreferences: (preferences: Partial<User['preferences']>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const defaultPreferences: User['preferences'] = {
  theme: 'system',
  emailNotifications: true,
  pushNotifications: true,
  categories: {
    system: true,
    security: true,
    updates: true,
    social: false,
    marketing: false,
    alerts: true,
  },
  priorities: {
    low: true,
    medium: true,
    high: true,
    critical: true,
  },
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication logic
    if (email && password.length >= 6) {
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        avatar: `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg`,
        preferences: defaultPreferences,
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && password.length >= 6 && name) {
      const mockUser: User = {
        id: '1',
        email,
        name,
        avatar: `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg`,
        preferences: defaultPreferences,
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updatePreferences = (newPreferences: Partial<User['preferences']>) => {
    if (user) {
      const updatedUser = {
        ...user,
        preferences: { ...user.preferences, ...newPreferences },
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      register,
      updatePreferences,
      isLoading,
    }}>
      {children}
    </AuthContext.Provider>
  );
};