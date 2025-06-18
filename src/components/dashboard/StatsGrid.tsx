import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Mail, Archive, AlertTriangle, TrendingUp, Clock } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';
import { LineChart, Line, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const StatsGrid: React.FC = () => {
  const { stats } = useNotifications();

  const statCards = [
    {
      title: 'Total Notifications',
      value: stats.total,
      icon: Bell,
      color: 'bg-blue-500',
      lightBg: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400',
      change: '+12%',
      trend: 'up' as const,
    },
    {
      title: 'Unread',
      value: stats.unread,
      icon: Mail,
      color: 'bg-orange-500',
      lightBg: 'bg-orange-50 dark:bg-orange-900/20',
      textColor: 'text-orange-600 dark:text-orange-400',
      change: '-5%',
      trend: 'down' as const,
    },
    {
      title: 'Read',
      value: stats.read,
      icon: Archive,
      color: 'bg-green-500',
      lightBg: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400',
      change: '+18%',
      trend: 'up' as const,
    },
    {
      title: 'Archived',
      value: stats.archived,
      icon: Archive,
      color: 'bg-purple-500',
      lightBg: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-600 dark:text-purple-400',
      change: '+3%',
      trend: 'up' as const,
    },
  ];

  const categoryData = Object.entries(stats.byCategory).map(([category, count]) => ({
    name: category,
    value: count,
    color: {
      system: '#3B82F6',
      security: '#EF4444',
      updates: '#10B981',
      social: '#8B5CF6',
      marketing: '#F59E0B',
      alerts: '#F97316',
    }[category] || '#6B7280',
  }));

  const priorityData = Object.entries(stats.byPriority).map(([priority, count]) => ({
    name: priority,
    value: count,
    color: {
      low: '#10B981',
      medium: '#F59E0B',
      high: '#F97316',
      critical: '#EF4444',
    }[priority] || '#6B7280',
  }));

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.lightBg}`}>
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className={`w-4 h-4 ${
                    stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  } ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                  <span className={`text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value.toLocaleString()}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {stat.title}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Activity
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Last 7 days
              </p>
            </div>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.recentActivity}>
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#3B82F6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                By Category
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Distribution breakdown
              </p>
            </div>
            <AlertTriangle className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="h-64 flex items-center">
            <div className="w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData.filter(item => item.value > 0)}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="w-1/2 space-y-2">
              {categoryData.filter(item => item.value > 0).map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Priority Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Priority Distribution
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {priorityData.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="text-center"
            >
              <div
                className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-xl"
                style={{ backgroundColor: item.color }}
              >
                {item.value}
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                {item.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {((item.value / stats.total) * 100).toFixed(1)}%
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default StatsGrid;