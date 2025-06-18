import React from 'react';
import { motion } from 'framer-motion';
import { MoreVertical, Mail, MailOpen, Archive, Trash2, ExternalLink, Shield, Asterisk as System, Bell, Users, Megaphone, AlertTriangle, RotateCcw, Trash as TrashX } from 'lucide-react';
import { Notification } from '../../types';
import { formatDistanceToNow } from 'date-fns';

interface NotificationCardProps {
  notification: Notification;
  isSelected: boolean;
  onToggleSelect: () => void;
  onMarkAsRead: () => void;
  onMarkAsUnread: () => void;
  onArchive: () => void;
  onDelete: () => void;
  onRestore: () => void;
  onPermanentlyDelete: () => void;
  isDeletedView?: boolean;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  isSelected,
  onToggleSelect,
  onMarkAsRead,
  onMarkAsUnread,
  onArchive,
  onDelete,
  onRestore,
  onPermanentlyDelete,
  isDeletedView = false,
}) => {
  const [showActions, setShowActions] = React.useState(false);

  const categoryIcons = {
    system: System,
    security: Shield,
    updates: Bell,
    social: Users,
    marketing: Megaphone,
    alerts: AlertTriangle,
  };

  const priorityColors = {
    low: 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800',
    medium: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800',
    high: 'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300 border-orange-200 dark:border-orange-800',
    critical: 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800',
  };

  const statusStyles = {
    unread: 'border-l-4 border-l-blue-500 bg-white dark:bg-gray-800',
    read: 'border-l-4 border-l-gray-300 dark:border-l-gray-600 bg-gray-50 dark:bg-gray-900/50',
    archived: 'border-l-4 border-l-purple-500 bg-purple-50 dark:bg-purple-900/10',
    deleted: 'border-l-4 border-l-red-500 bg-red-50 dark:bg-red-900/10',
  };

  const CategoryIcon = categoryIcons[notification.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.01 }}
      className={`relative p-4 rounded-xl border transition-all duration-200 ${
        statusStyles[notification.status]
      } ${isSelected ? 'ring-2 ring-blue-500 dark:ring-blue-400' : 'border-gray-200 dark:border-gray-700'}`}
    >
      <div className="flex items-start space-x-4">
        {/* Selection Checkbox */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onToggleSelect}
          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
            isSelected
              ? 'bg-blue-500 border-blue-500 text-white'
              : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
          }`}
        >
          {isSelected && (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </motion.button>

        {/* Category Icon */}
        <div className={`p-2 rounded-lg ${
          notification.category === 'security' ? 'bg-red-100 dark:bg-red-900/20' :
          notification.category === 'system' ? 'bg-blue-100 dark:bg-blue-900/20' :
          notification.category === 'updates' ? 'bg-green-100 dark:bg-green-900/20' :
          notification.category === 'social' ? 'bg-purple-100 dark:bg-purple-900/20' :
          notification.category === 'marketing' ? 'bg-orange-100 dark:bg-orange-900/20' :
          'bg-yellow-100 dark:bg-yellow-900/20'
        }`}>
          <CategoryIcon className={`w-5 h-5 ${
            notification.category === 'security' ? 'text-red-600 dark:text-red-400' :
            notification.category === 'system' ? 'text-blue-600 dark:text-blue-400' :
            notification.category === 'updates' ? 'text-green-600 dark:text-green-400' :
            notification.category === 'social' ? 'text-purple-600 dark:text-purple-400' :
            notification.category === 'marketing' ? 'text-orange-600 dark:text-orange-400' :
            'text-yellow-600 dark:text-yellow-400'
          }`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className={`text-sm font-semibold ${
              notification.status === 'unread' 
                ? 'text-gray-900 dark:text-white' 
                : 'text-gray-700 dark:text-gray-300'
            }`}>
              {notification.title}
            </h3>
            
            <div className="flex items-center space-x-2 ml-4">
              {/* Priority Badge */}
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${priorityColors[notification.priority]}`}>
                {notification.priority.toUpperCase()}
              </span>
              
              {/* Actions Menu */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowActions(!showActions)}
                  className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <MoreVertical className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </motion.button>

                {showActions && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50"
                  >
                    {isDeletedView ? (
                      <>
                        <button
                          onClick={() => {
                            onRestore();
                            setShowActions(false);
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-green-600 dark:text-green-400"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>Restore</span>
                        </button>
                        
                        <hr className="my-2 border-gray-200 dark:border-gray-700" />
                        
                        <button
                          onClick={() => {
                            onPermanentlyDelete();
                            setShowActions(false);
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400"
                        >
                          <TrashX className="w-4 h-4" />
                          <span>Delete Forever</span>
                        </button>
                      </>
                    ) : (
                      <>
                        {notification.status === 'unread' ? (
                          <button
                            onClick={() => {
                              onMarkAsRead();
                              setShowActions(false);
                            }}
                            className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                          >
                            <MailOpen className="w-4 h-4" />
                            <span>Mark as Read</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              onMarkAsUnread();
                              setShowActions(false);
                            }}
                            className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                          >
                            <Mail className="w-4 h-4" />
                            <span>Mark as Unread</span>
                          </button>
                        )}
                        
                        <button
                          onClick={() => {
                            onArchive();
                            setShowActions(false);
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                        >
                          <Archive className="w-4 h-4" />
                          <span>Archive</span>
                        </button>
                        
                        {notification.actionUrl && (
                          <button
                            onClick={() => setShowActions(false)}
                            className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>Take Action</span>
                          </button>
                        )}
                        
                        <hr className="my-2 border-gray-200 dark:border-gray-700" />
                        
                        <button
                          onClick={() => {
                            onDelete();
                            setShowActions(false);
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          <p className={`text-sm mb-3 ${
            notification.status === 'unread' 
              ? 'text-gray-700 dark:text-gray-300' 
              : 'text-gray-600 dark:text-gray-400'
          }`}>
            {notification.message}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
              <span className="capitalize">{notification.category}</span>
              <span>•</span>
              <span>{formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}</span>
              {notification.deletedAt && (
                <>
                  <span>•</span>
                  <span>Deleted {formatDistanceToNow(new Date(notification.deletedAt), { addSuffix: true })}</span>
                </>
              )}
            </div>

            {notification.actionUrl && !isDeletedView && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-xs font-medium transition-colors"
              >
                Take Action →
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close actions menu */}
      {showActions && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowActions(false)}
        />
      )}
    </motion.div>
  );
};

export default NotificationCard;