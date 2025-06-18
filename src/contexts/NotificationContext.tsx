import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Notification, NotificationFilter, NotificationStats, NotificationTemplate } from '../types';
import { mockNotifications, mockTemplates } from '../data/mockData';
import toast from 'react-hot-toast';

interface NotificationContextType {
  notifications: Notification[];
  templates: NotificationTemplate[];
  stats: NotificationStats;
  filter: NotificationFilter;
  selectedNotifications: string[];
  activeView: string;
  createNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNotification: (id: string, updates: Partial<Notification>) => void;
  deleteNotification: (id: string) => void;
  permanentlyDeleteNotification: (id: string) => void;
  restoreNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  markAsUnread: (id: string) => void;
  markAsArchived: (id: string) => void;
  bulkMarkAsRead: (ids: string[]) => void;
  bulkDelete: (ids: string[]) => void;
  bulkRestore: (ids: string[]) => void;
  bulkPermanentlyDelete: (ids: string[]) => void;
  setFilter: (filter: NotificationFilter) => void;
  clearFilter: () => void;
  toggleSelection: (id: string) => void;
  selectAll: () => void;
  clearSelection: () => void;
  setActiveView: (view: string) => void;
  filteredNotifications: Notification[];
  createTemplate: (template: Omit<NotificationTemplate, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTemplate: (id: string, updates: Partial<NotificationTemplate>) => void;
  deleteTemplate: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [templates, setTemplates] = useState<NotificationTemplate[]>(mockTemplates);
  const [filter, setFilter] = useState<NotificationFilter>({});
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);
  const [activeView, setActiveView] = useState('dashboard');

  const createNotification = (notificationData: Omit<Notification, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newNotification: Notification = {
      ...notificationData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    toast.success('Notification created successfully');
  };

  const updateNotification = (id: string, updates: Partial<Notification>) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, ...updates, updatedAt: new Date() }
          : notification
      )
    );
    toast.success('Notification updated');
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, status: 'deleted' as const, deletedAt: new Date(), updatedAt: new Date() }
          : notification
      )
    );
    setSelectedNotifications(prev => prev.filter(selectedId => selectedId !== id));
    toast.success('Notification moved to bin');
  };

  const permanentlyDeleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    setSelectedNotifications(prev => prev.filter(selectedId => selectedId !== id));
    toast.success('Notification permanently deleted');
  };

  const restoreNotification = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, status: 'unread' as const, deletedAt: undefined, updatedAt: new Date() }
          : notification
      )
    );
    toast.success('Notification restored');
  };

  const markAsRead = (id: string) => {
    updateNotification(id, { status: 'read' });
  };

  const markAsUnread = (id: string) => {
    updateNotification(id, { status: 'unread' });
  };

  const markAsArchived = (id: string) => {
    updateNotification(id, { status: 'archived' });
  };

  const bulkMarkAsRead = (ids: string[]) => {
    setNotifications(prev => 
      prev.map(notification => 
        ids.includes(notification.id) 
          ? { ...notification, status: 'read' as const, updatedAt: new Date() }
          : notification
      )
    );
    toast.success(`${ids.length} notifications marked as read`);
  };

  const bulkDelete = (ids: string[]) => {
    setNotifications(prev => 
      prev.map(notification => 
        ids.includes(notification.id) 
          ? { ...notification, status: 'deleted' as const, deletedAt: new Date(), updatedAt: new Date() }
          : notification
      )
    );
    setSelectedNotifications([]);
    toast.success(`${ids.length} notifications moved to bin`);
  };

  const bulkRestore = (ids: string[]) => {
    setNotifications(prev => 
      prev.map(notification => 
        ids.includes(notification.id) 
          ? { ...notification, status: 'unread' as const, deletedAt: undefined, updatedAt: new Date() }
          : notification
      )
    );
    setSelectedNotifications([]);
    toast.success(`${ids.length} notifications restored`);
  };

  const bulkPermanentlyDelete = (ids: string[]) => {
    setNotifications(prev => prev.filter(notification => !ids.includes(notification.id)));
    setSelectedNotifications([]);
    toast.success(`${ids.length} notifications permanently deleted`);
  };

  const clearFilter = () => {
    setFilter({});
    setActiveView('all');
  };

  const toggleSelection = (id: string) => {
    setSelectedNotifications(prev => 
      prev.includes(id) 
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedNotifications(filteredNotifications.map(n => n.id));
  };

  const clearSelection = () => {
    setSelectedNotifications([]);
  };

  const createTemplate = (templateData: Omit<NotificationTemplate, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTemplate: NotificationTemplate = {
      ...templateData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setTemplates(prev => [newTemplate, ...prev]);
    toast.success('Template created successfully');
  };

  const updateTemplate = (id: string, updates: Partial<NotificationTemplate>) => {
    setTemplates(prev => 
      prev.map(template => 
        template.id === id 
          ? { ...template, ...updates, updatedAt: new Date() }
          : template
      )
    );
    toast.success('Template updated');
  };

  const deleteTemplate = (id: string) => {
    setTemplates(prev => prev.filter(template => template.id !== id));
    toast.success('Template deleted');
  };

  // Filter notifications based on current filter and active view
  const filteredNotifications = notifications.filter(notification => {
    // Handle view-based filtering
    if (activeView === 'deleted' && notification.status !== 'deleted') return false;
    if (activeView !== 'deleted' && notification.status === 'deleted') return false;
    if (activeView === 'unread' && notification.status !== 'unread') return false;
    if (activeView === 'read' && notification.status !== 'read') return false;
    if (activeView === 'archived' && notification.status !== 'archived') return false;
    if (activeView === 'all' && notification.status === 'deleted') return false;

    // Handle filter-based filtering
    if (filter.status && !filter.status.includes(notification.status)) return false;
    if (filter.category && !filter.category.includes(notification.category)) return false;
    if (filter.priority && !filter.priority.includes(notification.priority)) return false;
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      if (!notification.title.toLowerCase().includes(searchLower) && 
          !notification.message.toLowerCase().includes(searchLower)) return false;
    }
    if (filter.dateRange) {
      const notificationDate = new Date(notification.createdAt);
      if (notificationDate < filter.dateRange.start || notificationDate > filter.dateRange.end) return false;
    }
    return true;
  });

  // Calculate stats
  const stats: NotificationStats = {
    total: notifications.filter(n => n.status !== 'deleted').length,
    unread: notifications.filter(n => n.status === 'unread').length,
    read: notifications.filter(n => n.status === 'read').length,
    archived: notifications.filter(n => n.status === 'archived').length,
    deleted: notifications.filter(n => n.status === 'deleted').length,
    byCategory: {
      system: notifications.filter(n => n.category === 'system' && n.status !== 'deleted').length,
      security: notifications.filter(n => n.category === 'security' && n.status !== 'deleted').length,
      updates: notifications.filter(n => n.category === 'updates' && n.status !== 'deleted').length,
      social: notifications.filter(n => n.category === 'social' && n.status !== 'deleted').length,
      marketing: notifications.filter(n => n.category === 'marketing' && n.status !== 'deleted').length,
      alerts: notifications.filter(n => n.category === 'alerts' && n.status !== 'deleted').length,
    },
    byPriority: {
      low: notifications.filter(n => n.priority === 'low' && n.status !== 'deleted').length,
      medium: notifications.filter(n => n.priority === 'medium' && n.status !== 'deleted').length,
      high: notifications.filter(n => n.priority === 'high' && n.status !== 'deleted').length,
      critical: notifications.filter(n => n.priority === 'critical' && n.status !== 'deleted').length,
    },
    recentActivity: Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayStart = new Date(date.setHours(0, 0, 0, 0));
      const dayEnd = new Date(date.setHours(23, 59, 59, 999));
      
      return {
        date: dayStart.toISOString().split('T')[0],
        count: notifications.filter(n => {
          const nDate = new Date(n.createdAt);
          return nDate >= dayStart && nDate <= dayEnd && n.status !== 'deleted';
        }).length,
      };
    }).reverse(),
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      templates,
      stats,
      filter,
      selectedNotifications,
      activeView,
      createNotification,
      updateNotification,
      deleteNotification,
      permanentlyDeleteNotification,
      restoreNotification,
      markAsRead,
      markAsUnread,
      markAsArchived,
      bulkMarkAsRead,
      bulkDelete,
      bulkRestore,
      bulkPermanentlyDelete,
      setFilter,
      clearFilter,
      toggleSelection,
      selectAll,
      clearSelection,
      setActiveView,
      filteredNotifications,
      createTemplate,
      updateTemplate,
      deleteTemplate,
    }}>
      {children}
    </NotificationContext.Provider>
  );
};