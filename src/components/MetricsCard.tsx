import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingDown } from 'lucide-react';
import { formatNumber, formatCO2, formatCO2Equivalent } from '../lib/utils';

interface MetricsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change: number;
  trend: 'up' | 'down';
  color: string;
  subtitle?: string;
}

const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  icon,
  change,
  trend,
  color,
  subtitle
}) => {
  return (
    <motion.div 
      className="card p-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${color}`}>
          {icon}
        </div>
        
        <div className={`flex items-center text-sm ${trend === 'down' ? 'text-success-500' : 'text-error-500'}`}>
          <span className="font-medium">{change}%</span>
          {trend === 'down' ? (
            <TrendingDown className="ml-1 h-4 w-4" />
          ) : (
            <ArrowUpRight className="ml-1 h-4 w-4" />
          )}
        </div>
      </div>
      
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      
      {subtitle && (
        <div className="mt-2 text-xs text-gray-500">{subtitle}</div>
      )}
    </motion.div>
  );
};

export default MetricsCard;