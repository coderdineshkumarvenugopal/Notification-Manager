import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check as CheckAll, Archive, Trash2, Filter, RotateCcw, Trash as TrashX } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';
import NotificationCard from './NotificationCard';

const NotificationList: React.FC = () => {
  const {
    filteredNotifications,
    selectedNotifications,
    markAsRead,
    markAsUnread,
    markAsArchived,
    deleteNotification,
    permanentlyDeleteNotification,
    restoreNotification,
    bulkMarkAsRead,
    bulkDelete,
    bulkRestore,
    bulkPermanentlyDelete,
    toggleSelection,
    selectAll,
    clearSelection,
    filter,
    clearFilter,
    activeView,
  } = useNotifications();

  const hasSelectedNotifications = selectedNotifications.length > 0;
  const hasFilters = Object.keys(filter).some(key => filter[key as keyof typeof filter]);
  const isDeletedView = activeView === 'deleted';

  const handleBulkAction = (action: 'read' | 'delete' | 'restore' | 'permanentDelete') => {
    switch (action) {
      case 'read':
        bulkMarkAsRead(selectedNotifications);
        break;
      case 'delete':
        bulkDelete(selectedNotifications);
        break;
      case 'restore':
        bulkRestore(selectedNotifications);
        break;
      case 'permanentDelete':
        bulkPermanentlyDelete(selectedNotifications);
        break;
    }
  };

  return (
    <div className="space-y-6 h-full overflow-hidden flex flex-col">
      {/* Bulk Actions */}
      <div className="flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={selectedNotifications.length === filteredNotifications.length ? clearSelection : selectAll}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors"
          >
            <CheckAll className="w-4 h-4" />
            <span className="text-sm font-medium">
              {selectedNotifications.length === filteredNotifications.length ? 'Deselect All' : 'Select All'}
            </span>
          </motion.button>

          {hasSelectedNotifications && (
            <div className="flex items-center space-x-2">
              {!isDeletedView ? (
                <>
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleBulkAction('read')}
                    className="flex items-center space-x-2 px-3 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/40 rounded-lg transition-colors"
                  >
                    <CheckAll className="w-4 h-4" />
                    <span className="text-sm">Mark Read</span>
                  </motion.button>

                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleBulkAction('delete')}
                    className="flex items-center space-x-2 px-3 py-2 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/40 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm">Delete</span>
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleBulkAction('restore')}
                    className="flex items-center space-x-2 px-3 py-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/40 rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span className="text-sm">Restore</span>
                  </motion.button>

                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleBulkAction('permanentDelete')}
                    className="flex items-center space-x-2 px-3 py-2 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/40 rounded-lg transition-colors"
                  >
                    <TrashX className="w-4 h-4" />
                    <span className="text-sm">Delete Forever</span>
                  </motion.button>
                </>
              )}
            </div>
          )}
        </div>

        {hasFilters && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearFilter}
            className="flex items-center space-x-2 px-3 py-2 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/40 rounded-lg transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm">Clear Filters</span>
          </motion.button>
        )}
      </div>

      {/* Selection Info */}
      {hasSelectedNotifications && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 flex-shrink-0"
        >
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            <strong>{selectedNotifications.length}</strong> notification{selectedNotifications.length !== 1 ? 's' : ''} selected
          </p>
        </motion.div>
      )}

      {/* Notifications */}
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4">
        <AnimatePresence>
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <NotificationCard
                  notification={notification}
                  isSelected={selectedNotifications.includes(notification.id)}
                  onToggleSelect={() => toggleSelection(notification.id)}
                  onMarkAsRead={() => markAsRead(notification.id)}
                  onMarkAsUnread={() => markAsUnread(notification.id)}
                  onArchive={() => markAsArchived(notification.id)}
                  onDelete={() => deleteNotification(notification.id)}
                  onRestore={() => restoreNotification(notification.id)}
                  onPermanentlyDelete={() => permanentlyDeleteNotification(notification.id)}
                  isDeletedView={isDeletedView}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                {isDeletedView ? (
                  <Trash2 className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                ) : (
                  <Archive className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {isDeletedView ? 'Bin is empty' : 'No notifications found'}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                {isDeletedView
                  ? 'Deleted notifications will appear here. You can restore or permanently delete them.'
                  : hasFilters
                  ? 'No notifications match your current filters. Try adjusting your search criteria.'
                  : 'You\'re all caught up! New notifications will appear here.'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NotificationList;