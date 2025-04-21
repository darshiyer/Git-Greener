import React from 'react';
import { ArrowRight, Zap, Server, Database, Wifi } from 'lucide-react';
import { OptimizationSuggestion } from '../types';
import { formatCO2 } from '../lib/utils';

interface SuggestionsCardProps {
  suggestions: OptimizationSuggestion[];
  limit?: number;
}

const SuggestionsCard: React.FC<SuggestionsCardProps> = ({ suggestions, limit = 3 }) => {
  const displayedSuggestions = suggestions.slice(0, limit);
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'code':
        return <Zap className="h-5 w-5 text-primary-500" />;
      case 'infrastructure':
        return <Server className="h-5 w-5 text-secondary-500" />;
      case 'database':
        return <Database className="h-5 w-5 text-accent-500" />;
      case 'network':
        return <Wifi className="h-5 w-5 text-warning-500" />;
      default:
        return <Zap className="h-5 w-5 text-primary-500" />;
    }
  };
  
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-error-500 bg-error-50';
      case 'medium':
        return 'text-warning-500 bg-warning-50';
      case 'low':
        return 'text-primary-500 bg-primary-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };
  
  return (
    <div className="card p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Optimization Suggestions</h3>
        <button className="text-secondary-600 text-sm font-medium flex items-center hover:text-secondary-700">
          View All <ArrowRight className="ml-1 h-4 w-4" />
        </button>
      </div>
      
      <div className="space-y-4">
        {displayedSuggestions.map((suggestion) => (
          <div key={suggestion.id} className="card card-hover p-4">
            <div className="flex items-start">
              <div className="mr-4">
                {getCategoryIcon(suggestion.category)}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-gray-900">{suggestion.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getImpactColor(suggestion.impact)}`}>
                    {suggestion.impact.charAt(0).toUpperCase() + suggestion.impact.slice(1)} Impact
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
                
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="bg-success-50 text-success-700 rounded-full px-2 py-1">
                    {formatCO2(suggestion.estimatedSavings.co2)} saved
                  </span>
                  <span className="bg-secondary-50 text-secondary-700 rounded-full px-2 py-1">
                    ${suggestion.estimatedSavings.cost} cost reduction
                  </span>
                  <span className="bg-primary-50 text-primary-700 rounded-full px-2 py-1">
                    {suggestion.estimatedSavings.performance}% faster
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestionsCard;