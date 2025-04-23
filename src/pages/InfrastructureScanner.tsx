import React from 'react';
import { motion } from 'framer-motion';
import { Check, CloudCog, PieChart, Server, ArrowRight, TrendingDown } from 'lucide-react';
import { resourceUsage, greenScoreMetrics } from '../data/mockData';

const InfrastructureScanner: React.FC = () => {
  const getProviderLogo = (provider: string) => {
    switch (provider.toLowerCase()) {
      case 'google cloud':
        return '🟨'; // Using emoji as placeholder for GCP logo
      default:
        return '☁️'; // Default cloud emoji
    }
  };
  
  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 80) return 'text-success-500';
    if (efficiency >= 60) return 'text-primary-500';
    if (efficiency >= 40) return 'text-warning-500';
    return 'text-error-500';
  };
  
  const getResourceTypeIcon = (type: string) => {
    switch (type) {
      case 'server':
        return <Server className="h-5 w-5 text-secondary-500" />;
      case 'database':
        return <PieChart className="h-5 w-5 text-primary-500" />;
      case 'storage':
        return <CloudCog className="h-5 w-5 text-accent-500" />;
      case 'network':
        return <ArrowRight className="h-5 w-5 text-warning-500" />;
      default:
        return <Server className="h-5 w-5 text-secondary-500" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Infrastructure Scanner</h1>
        <div className="flex space-x-2">
          <button className="btn btn-ghost">
            Export Report
          </button>
          <button className="btn btn-primary">
            Run New Scan
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Overall Infrastructure Score */}
        <div className="lg:col-span-4">
          <div className="card p-6 bg-gradient-to-r from-secondary-600 to-secondary-400 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Infrastructure Health Score</h2>
                <p className="opacity-80">
                  Your infrastructure is running efficiently with low resource utilization
                </p>
              </div>
              <div className="text-5xl font-bold">{greenScoreMetrics.infrastructureEfficiency}%</div>
            </div>
          </div>
        </div>

        {/* Resource Cards */}
        {resourceUsage.map((resource) => (
          <motion.div
            key={resource.id}
            className="card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                {getResourceTypeIcon(resource.type)}
                <div className="ml-3">
                  <h3 className="font-medium text-gray-900">{resource.name}</h3>
                  <p className="text-sm text-gray-500">{resource.region}</p>
                </div>
              </div>
              <span className={`text-sm font-semibold ${getEfficiencyColor(resource.efficiency)}`}>
                {resource.efficiency}% Efficient
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Current Usage</span>
                  <span className="font-medium text-gray-900">{resource.currentUsage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-500 rounded-full h-2"
                    style={{ width: `${resource.currentUsage}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">Monthly Cost</div>
                <div className="text-sm font-medium">₹{resource.cost}</div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">CO₂ Emissions</div>
                <div className="text-sm font-medium">{resource.co2Emissions} kg/month</div>
              </div>

              <div className="border-t pt-4 mt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Recommendations</h4>
                <div className="space-y-2">
                  {resource.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start text-sm">
                      <Check className="h-4 w-4 text-success-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{recommendation}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Summary Card */}
        <div className="lg:col-span-4">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Infrastructure Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card bg-gray-50 p-4">
                <div className="text-sm text-gray-500 mb-1">Total Monthly Cost</div>
                <div className="text-2xl font-bold text-gray-900">₹{resourceUsage.reduce((acc, r) => acc + r.cost, 0)}</div>
              </div>
              <div className="card bg-gray-50 p-4">
                <div className="text-sm text-gray-500 mb-1">Total CO₂ Emissions</div>
                <div className="text-2xl font-bold text-gray-900">{resourceUsage.reduce((acc, r) => acc + r.co2Emissions, 0)} kg</div>
              </div>
              <div className="card bg-gray-50 p-4">
                <div className="text-sm text-gray-500 mb-1">Avg Resource Usage</div>
                <div className="text-2xl font-bold text-gray-900">
                  {Math.round(resourceUsage.reduce((acc, r) => acc + r.currentUsage, 0) / resourceUsage.length)}%
                </div>
              </div>
              <div className="card bg-gray-50 p-4">
                <div className="text-sm text-gray-500 mb-1">Avg Efficiency</div>
                <div className="text-2xl font-bold text-gray-900">
                  {Math.round(resourceUsage.reduce((acc, r) => acc + r.efficiency, 0) / resourceUsage.length)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfrastructureScanner;