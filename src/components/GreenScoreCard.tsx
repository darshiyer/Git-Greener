import React from 'react';
import { motion } from 'framer-motion';
import { GreenScoreMetrics } from '../types';
import { getScoreColor, getScoreGradient } from '../lib/utils';

interface GreenScoreCardProps {
  metrics: GreenScoreMetrics;
}

const GreenScoreCard: React.FC<GreenScoreCardProps> = ({ metrics }) => {
  const { codeEfficiency, infrastructureEfficiency, resourceUtilization, carbonIntensity, overall } = metrics;
  
  // Animation variants for the score ring
  const ringVariants = {
    hidden: { pathLength: 0 },
    visible: (i: number) => ({
      pathLength: i / 100,
      transition: {
        pathLength: { type: "spring", duration: 1.5, bounce: 0 }
      }
    })
  };
  
  return (
    <div className="card p-6">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Green Score</h3>
      </div>
      
      <div className="flex flex-col items-center mb-6">
        <div className="relative h-36 w-36">
          <svg width="144" height="144" viewBox="0 0 144 144">
            {/* Background circle */}
            <circle
              cx="72"
              cy="72"
              r="60"
              fill="none"
              stroke="#f1f5f9"
              strokeWidth="12"
            />
            
            {/* Score circle */}
            <motion.circle
              cx="72"
              cy="72"
              r="60"
              fill="none"
              stroke={`url(#greenScoreGradient)`}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray="376.8"
              strokeDashoffset="0"
              transform="rotate(-90, 72, 72)"
              custom={overall}
              variants={ringVariants}
              initial="hidden"
              animate="visible"
            />
            
            {/* Gradient definition */}
            <defs>
              <linearGradient id="greenScoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" className={`stop-color-${getScoreGradient(overall).split(' ')[0]}`} />
                <stop offset="100%" className={`stop-color-${getScoreGradient(overall).split(' ')[1]}`} />
              </linearGradient>
            </defs>
          </svg>
          
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className={`text-4xl font-bold ${getScoreColor(overall)}`}>{overall}</span>
            <span className="text-sm text-gray-500">out of 100</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Code Efficiency</span>
            <span className={`text-sm font-semibold ${getScoreColor(codeEfficiency)}`}>{codeEfficiency}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div 
              className={`h-2 rounded-full bg-gradient-to-r ${getScoreGradient(codeEfficiency)}`}
              initial={{ width: 0 }}
              animate={{ width: `${codeEfficiency}%` }}
              transition={{ duration: 0.8, delay: 0.1 }}
            />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Infrastructure</span>
            <span className={`text-sm font-semibold ${getScoreColor(infrastructureEfficiency)}`}>{infrastructureEfficiency}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div 
              className={`h-2 rounded-full bg-gradient-to-r ${getScoreGradient(infrastructureEfficiency)}`}
              initial={{ width: 0 }}
              animate={{ width: `${infrastructureEfficiency}%` }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Resource Utilization</span>
            <span className={`text-sm font-semibold ${getScoreColor(resourceUtilization)}`}>{resourceUtilization}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div 
              className={`h-2 rounded-full bg-gradient-to-r ${getScoreGradient(resourceUtilization)}`}
              initial={{ width: 0 }}
              animate={{ width: `${resourceUtilization}%` }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Carbon Intensity</span>
            <span className={`text-sm font-semibold ${getScoreColor(carbonIntensity)}`}>{carbonIntensity}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div 
              className={`h-2 rounded-full bg-gradient-to-r ${getScoreGradient(carbonIntensity)}`}
              initial={{ width: 0 }}
              animate={{ width: `${carbonIntensity}%` }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreenScoreCard;