export type NotificationPriority = 'low' | 'medium' | 'high' | 'critical';
export type NotificationCategory = 'system' | 'security' | 'updates' | 'social' | 'marketing' | 'alerts';
export type NotificationStatus = 'unread' | 'read' | 'archived' | 'deleted';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  emailNotifications: boolean;
  pushNotifications: boolean;
  categories: Record<NotificationCategory, boolean>;
  priorities: Record<NotificationPriority, boolean>;
  autoArchive: boolean;
  soundEnabled: boolean;
  compactView: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  category: NotificationCategory;
  priority: NotificationPriority;
  status: NotificationStatus;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  actionUrl?: string;
  metadata?: Record<string, any>;
  template?: string;
  deletedAt?: Date;
}

export interface NotificationTemplate {
  id: string;
  name: string;
  title: string;
  message: string;
  category: NotificationCategory;
  priority: NotificationPriority;
  variables: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationFilter {
  status?: NotificationStatus[];
  category?: NotificationCategory[];
  priority?: NotificationPriority[];
  search?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface NotificationStats {
  total: number;
  unread: number;
  read: number;
  archived: number;
  deleted: number;
  byCategory: Record<NotificationCategory, number>;
  byPriority: Record<NotificationPriority, number>;
  recentActivity: Array<{
    date: string;
    count: number;
  }>;
}