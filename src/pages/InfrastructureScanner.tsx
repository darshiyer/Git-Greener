import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, CloudCog, PieChart, Server } from 'lucide-react';
import { resourceUsage } from '../data/mockData';

const InfrastructureScanner: React.FC = () => {
  const [activeResource, setActiveResource] = useState(resourceUsage[0].id);
  
  const selectedResource = resourceUsage.find(resource => resource.id === activeResource) || resourceUsage[0];
  
  const getProviderLogo = (provider: string) => {
    switch (provider.toLowerCase()) {
      case 'aws':
        return '🟧'; // Using emoji as placeholder for AWS logo
      case 'azure':
        return '🟦'; // Using emoji as placeholder for Azure logo
      case 'gcp':
        return '🟩'; // Using emoji as placeholder for GCP logo
      case 'cloudflare':
        return '🟪'; // Using emoji as placeholder for Cloudflare logo
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
      
      <div className="card p-6 bg-gradient-to-r from-secondary-600 to-secondary-400 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Connect Your Cloud Infrastructure</h2>
            <p className="opacity-80 mb-4 md:mb-0">
              Link your AWS, Azure, GCP or other cloud providers to get detailed sustainability insights.
            </p>
          </div>
          <button className="btn bg-white text-secondary-600 hover:bg-gray-100">
            Connect Cloud Account
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="card p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 px-2">Resources</h3>
            
            <nav className="space-y-1">
              {resourceUsage.map((resource) => (
                <button
                  key={resource.id}
                  className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                    resource.id === activeResource
                      ? 'bg-secondary-50 text-secondary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveResource(resource.id)}
                >
                  <div className="mr-3 flex-shrink-0">{getResourceTypeIcon(resource.type)}</div>
                  <div className="flex flex-col items-start">
                    <span>{resource.name}</span>
                    <span className="text-xs text-gray-500">{resource.provider} • {resource.region}</span>
                  </div>
                  <div className="ml-auto">
                    <span className={`text-sm font-semibold ${getEfficiencyColor(resource.efficiency)}`}>
                      {resource.efficiency}%
                    </span>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <motion.div 
            className="card p-6"
            key={selectedResource.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center">
                  <span className="text-2xl mr-2">{getProviderLogo(selectedResource.provider)}</span>
                  <h2 className="text-xl font-semibold text-gray-900">{selectedResource.name}</h2>
                </div>
                <p className="text-sm text-gray-500">
                  {selectedResource.provider} • {selectedResource.region} • {selectedResource.type}
                </p>
              </div>
              
              <div className="bg-gray-100 rounded-full px-3 py-1 text-sm font-medium">
                ${selectedResource.cost}/month
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="card p-4 bg-gray-50">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Current Usage</h4>
                <div className="text-2xl font-bold text-gray-900">{selectedResource.currentUsage}%</div>
              </div>
              
              <div className="card p-4 bg-gray-50">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Efficiency Score</h4>
                <div className={`text-2xl font-bold ${getEfficiencyColor(selectedResource.efficiency)}`}>
                  {selectedResource.efficiency}%
                </div>
              </div>
              
              <div className="card p-4 bg-gray-50">
                <h4 className="text-sm font-medium text-gray-500 mb-1">CO₂ Emissions</h4>
                <div className="text-2xl font-bold text-gray-900">{selectedResource.co2Emissions} kg</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Recommendations</h3>
              
              <div className="space-y-3">
                {selectedResource.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start p-3 bg-success-50 rounded-lg">
                    <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5" />
                    <p className="text-sm text-gray-800">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InfrastructureScanner;