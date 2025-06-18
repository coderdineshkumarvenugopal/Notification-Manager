import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, BarChart3, Filter, Archive, Mail, Shield, Asterisk as System, Users, Megaphone, AlertTriangle, Plus, BookTemplate as Template, Settings, Trash2, X, Check } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';
import { NotificationCategory, NotificationStatus } from '../../types';

interface SidebarProps {
  onCreateNew: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onCreateNew }) => {
  const { stats, filter, setFilter, activeView, setActiveView, clearFilter } = useNotifications();
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard', count: null },
    { id: 'all', icon: Bell, label: 'All Notifications', count: stats.total },
    { id: 'unread', icon: Mail, label: 'Unread', count: stats.unread },
    { id: 'read', icon: Archive, label: 'Read', count: stats.read },
    { id: 'archived', icon: Archive, label: 'Archived', count: stats.archived },
    { id: 'deleted', icon: Trash2, label: 'Bin', count: stats.deleted },
  ];

  const categories = [
    { id: 'system', icon: System, label: 'System', count: stats.byCategory.system },
    { id: 'security', icon: Shield, label: 'Security', count: stats.byCategory.security },
    { id: 'updates', icon: Bell, label: 'Updates', count: stats.byCategory.updates },
    { id: 'social', icon: Users, label: 'Social', count: stats.byCategory.social },
    { id: 'marketing', icon: Megaphone, label: 'Marketing', count: stats.byCategory.marketing },
    { id: 'alerts', icon: AlertTriangle, label: 'Alerts', count: stats.byCategory.alerts },
  ];

  const handleViewChange = (view: string) => {
    setActiveView(view);
    if (view === 'dashboard') {
      setFilter({});
    } else if (view === 'all') {
      setFilter({});
    } else if (['unread', 'read', 'archived', 'deleted'].includes(view)) {
      setFilter({ status: [view as NotificationStatus] });
    }
  };

  const handleCategoryFilter = (category: NotificationCategory) => {
    const currentCategories = filter.category || [];
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter(c => c !== category)
      : [...currentCategories, category];
    
    setFilter({ ...filter, category: newCategories.length > 0 ? newCategories : undefined });
    
    // Switch to all notifications view when filtering by category
    if (newCategories.length > 0 && activeView === 'dashboard') {
      setActiveView('all');
    }
  };

  const isActiveCategory = (category: NotificationCategory) => {
    return filter.category?.includes(category) || false;
  };

  const hasActiveFilters = filter.category && filter.category.length > 0;

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-full flex flex-col overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCreateNew}
          className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          <span>New Notification</span>
        </motion.button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Main Navigation */}
        <nav className="px-4 py-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleViewChange(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.count !== null && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    isActive
                      ? 'bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {item.count}
                  </span>
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Categories */}
        <div className="px-4 py-4">
          <div className="flex flex-row gap-20 items-center mb-3">
            <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Categories
            </h3>
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowCategoryFilter(!showCategoryFilter)}
                className={`p-1 rounded-full transition-colors ${
                  showCategoryFilter
                    ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                title="Toggle category filter"
              >
                <Filter className="w-3 h-3" />
              </motion.button>
              {hasActiveFilters && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setFilter({ ...filter, category: undefined });
                    if (activeView !== 'dashboard') {
                      setActiveView('all');
                    }
                  }}
                  className="p-1 rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors"
                  title="Clear category filters"
                >
                  <X className="w-3 h-3" />
                </motion.button>
              )}
            </div>
          </div>

          <AnimatePresence>
            {showCategoryFilter && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    Filter Categories
                  </span>
                  <button
                    onClick={() => {
                      // Select all categories
                      const allCategories = categories.map(c => c.id as NotificationCategory);
                      setFilter({ ...filter, category: allCategories });
                      if (activeView === 'dashboard') {
                        setActiveView('all');
                      }
                    }}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    Select All
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {categories.map((category) => {
                    const isSelected = isActiveCategory(category.id as NotificationCategory);
                    return (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryFilter(category.id as NotificationCategory)}
                        className={`flex items-center space-x-2 px-2 py-1 rounded text-xs transition-colors ${
                          isSelected
                            ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        <div className={`w-3 h-3 rounded border flex items-center justify-center ${
                          isSelected
                            ? 'bg-blue-500 border-blue-500'
                            : 'border-gray-300 dark:border-gray-600'
                        }`}>
                          {isSelected && <Check className="w-2 h-2 text-white" />}
                        </div>
                        <span className="truncate">{category.label}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-1">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = isActiveCategory(category.id as NotificationCategory);
              
              return (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCategoryFilter(category.id as NotificationCategory)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{category.label}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    isActive
                      ? 'bg-emerald-100 dark:bg-emerald-800 text-emerald-600 dark:text-emerald-300'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {category.count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Tools */}
        <div className="px-4 py-4">
          <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
            Tools
          </h3>
          <div className="space-y-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveView('templates')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                activeView === 'templates'
                  ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Template className="w-4 h-4" />
              <span className="text-sm">Templates</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveView('settings')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                activeView === 'settings'
                  ? 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm">Settings</span>
            </motion.button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;