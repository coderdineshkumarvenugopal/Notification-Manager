import { Notification, NotificationTemplate } from '../types';

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Security Alert: New Login Detected',
    message: 'A new login was detected from Chrome on Windows in New York, USA. If this wasn\'t you, please secure your account immediately.',
    category: 'security',
    priority: 'high',
    status: 'unread',
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 30),
    userId: '1',
    actionUrl: '/security/sessions',
  },
  {
    id: '2',
    title: 'System Maintenance Scheduled',
    message: 'We have scheduled system maintenance for this weekend. Services may be temporarily unavailable between 2 AM - 4 AM EST.',
    category: 'system',
    priority: 'medium',
    status: 'unread',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    userId: '1',
  },
  {
    id: '3',
    title: 'New Feature: Dark Mode Available',
    message: 'We\'ve added a new dark mode feature! You can toggle between light and dark themes in your preferences.',
    category: 'updates',
    priority: 'low',
    status: 'read',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 4), // Updated 4 hours ago
    userId: '1',
    actionUrl: '/preferences',
  },
  {
    id: '4',
    title: 'Payment Method Expiring Soon',
    message: 'Your primary payment method ending in ****4532 will expire next month. Please update your billing information.',
    category: 'alerts',
    priority: 'high',
    status: 'unread',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
    userId: '1',
    actionUrl: '/billing',
  },
  {
    id: '5',
    title: 'Welcome to Our Platform!',
    message: 'Thank you for joining us! Here are some quick tips to get you started with our notification management system.',
    category: 'social',
    priority: 'low',
    status: 'read',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 23),
    userId: '1',
  },
  {
    id: '6',
    title: 'Critical: Database Backup Failed',
    message: 'The automated database backup process failed at 3:00 AM. Immediate attention required to ensure data integrity.',
    category: 'system',
    priority: 'critical',
    status: 'archived',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    userId: '1',
    actionUrl: '/admin/backups',
  },
  {
    id: '7',
    title: 'Special Offer: 50% Off Premium Features',
    message: 'Limited time offer! Upgrade to premium and get access to advanced analytics, custom templates, and priority support.',
    category: 'marketing',
    priority: 'medium',
    status: 'unread',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    userId: '1',
    actionUrl: '/upgrade',
  },
  {
    id: '8',
    title: 'API Rate Limit Warning',
    message: 'You are approaching your API rate limit. Current usage: 850/1000 requests per hour.',
    category: 'alerts',
    priority: 'medium',
    status: 'read',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), // 4 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    userId: '1',
  },
  {
    id: '9',
    title: 'Deleted Notification Example',
    message: 'This is an example of a deleted notification that appears in the bin.',
    category: 'system',
    priority: 'low',
    status: 'deleted',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    deletedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // Deleted 2 days ago
    userId: '1',
  },
];

export const mockTemplates: NotificationTemplate[] = [
  {
    id: '1',
    name: 'Security Alert',
    title: 'Security Alert: {{alertType}}',
    message: 'A security event has been detected: {{description}}. Please review your account security settings.',
    category: 'security',
    priority: 'high',
    variables: ['alertType', 'description'],
    isActive: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
  },
  {
    id: '2',
    name: 'System Maintenance',
    title: 'System Maintenance: {{maintenanceType}}',
    message: 'We have scheduled {{maintenanceType}} maintenance for {{date}}. Services may be temporarily unavailable.',
    category: 'system',
    priority: 'medium',
    variables: ['maintenanceType', 'date'],
    isActive: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14), // 14 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
  },
  {
    id: '3',
    name: 'Feature Update',
    title: 'New Feature: {{featureName}}',
    message: 'We\'ve added a new feature called {{featureName}}! {{description}}',
    category: 'updates',
    priority: 'low',
    variables: ['featureName', 'description'],
    isActive: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 21), // 21 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 21),
  },
  {
    id: '4',
    name: 'Payment Reminder',
    title: 'Payment Reminder: {{paymentType}}',
    message: 'Your {{paymentType}} is due on {{dueDate}}. Amount: {{amount}}',
    category: 'alerts',
    priority: 'high',
    variables: ['paymentType', 'dueDate', 'amount'],
    isActive: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 30 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
  },
  {
    id: '5',
    name: 'Welcome Message',
    title: 'Welcome to {{platformName}}!',
    message: 'Thank you for joining {{platformName}}! We\'re excited to have you on board. {{welcomeMessage}}',
    category: 'social',
    priority: 'low',
    variables: ['platformName', 'welcomeMessage'],
    isActive: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45), // 45 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45),
  },
];