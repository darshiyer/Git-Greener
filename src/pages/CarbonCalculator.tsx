import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  BarChart3, 
  CloudCog, 
  Download,
  Laptop,
  Server
} from 'lucide-react';
import { 
  emissionSources,
  historicalData,
  optimizationImpact
} from '../data/mockData';
import { formatCO2, formatCO2Equivalent } from '../lib/utils';
import EmissionsChart from '../components/EmissionsChart';
import HistoricalChart from '../components/HistoricalChart';

const CarbonCalculator: React.FC = () => {
  const [dataType, setDataType] = useState<'monthly' | 'yearly'>('monthly');
  
  const impactData = {
    labels: ['Before Optimization', 'After Optimization'],
    datasets: [
      {
        label: 'CO₂ Emissions',
        data: [optimizationImpact.before.co2Emissions, optimizationImpact.after.co2Emissions]
      }
    ]
  };
  
  const formatDataForDisplay = () => {
    if (dataType === 'yearly') {
      return {
        emissions: optimizationImpact.after.co2Emissions * 12,
        cost: optimizationImpact.after.costPerMonth * 12
      };
    }
    return {
      emissions: optimizationImpact.after.co2Emissions,
      cost: optimizationImpact.after.costPerMonth
    };
  };
  
  const displayData = formatDataForDisplay();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Carbon Calculator</h1>
        <div className="flex space-x-2">
          <button className="btn btn-ghost">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
          <button className="btn btn-primary">
            Calculate New Estimate
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-6 bg-primary-50">
          <CloudCog className="h-8 w-8 text-primary-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Carbon Footprint</h3>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {formatCO2(displayData.emissions)}
          </div>
          <p className="text-sm text-gray-600">
            {formatCO2Equivalent(displayData.emissions)}
          </p>
        </div>
        
        <div className="card p-6 bg-secondary-50">
          <Server className="h-8 w-8 text-secondary-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Server Efficiency</h3>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {optimizationImpact.after.serverResponseTime}ms
          </div>
          <p className="text-sm text-gray-600">
            {optimizationImpact.savings.serverResponseTimePercentage}% improvement
          </p>
        </div>
        
        <div className="card p-6 bg-accent-50">
          <Laptop className="h-8 w-8 text-accent-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Client Performance</h3>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {optimizationImpact.after.pageLoadTime}s
          </div>
          <p className="text-sm text-gray-600">
            {optimizationImpact.savings.pageLoadTimePercentage}% faster load time
          </p>
        </div>
        
        <div className="card p-6 bg-warning-50">
          <BarChart3 className="h-8 w-8 text-warning-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Cost Impact</h3>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            ${displayData.cost}
          </div>
          <p className="text-sm text-gray-600">
            {optimizationImpact.savings.costPercentage}% cost reduction
          </p>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 mb-2">
        <button
          className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
            dataType === 'monthly'
              ? 'bg-secondary-50 text-secondary-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setDataType('monthly')}
        >
          Monthly
        </button>
        <button
          className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
            dataType === 'yearly'
              ? 'bg-secondary-50 text-secondary-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setDataType('yearly')}
        >
          Yearly
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EmissionsChart data={emissionSources} />
        
        <HistoricalChart
          data={historicalData}
          dataKey="co2Emissions"
          color="#10B981"
          gradient="carbonGradient"
          title="Carbon Emissions Trend"
          valueFormatter={(value) => `${value} kg CO₂e`}
        />
      </div>
      
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimization Impact</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-500">Before Optimization</p>
                <p className="text-xl font-semibold text-gray-900">
                  {formatCO2(optimizationImpact.before.co2Emissions)}
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">After Optimization</p>
                <p className="text-xl font-semibold text-success-600">
                  {formatCO2(optimizationImpact.after.co2Emissions)}
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">What This Means</h4>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Your optimizations have resulted in a <span className="font-medium text-success-600">{optimizationImpact.savings.co2EmissionsPercentage}% reduction</span> in carbon emissions, equivalent to:
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="h-5 w-5 text-success-500 mr-2">🌳</span>
                    <span>Planting {Math.round((optimizationImpact.before.co2Emissions - optimizationImpact.after.co2Emissions) / 21)} trees</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 text-success-500 mr-2">🚗</span>
                    <span>Removing {Math.round((optimizationImpact.before.co2Emissions - optimizationImpact.after.co2Emissions) * 2.4)} miles of car travel</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 text-success-500 mr-2">💡</span>
                    <span>Saving {Math.round((optimizationImpact.before.co2Emissions - optimizationImpact.after.co2Emissions) * 1.5)} kWh of electricity</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-700">Cost Impact</h4>
              <span className="text-sm font-medium text-success-600">
                ${optimizationImpact.before.costPerMonth - optimizationImpact.after.costPerMonth} saved per month
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
              <motion.div 
                className="h-4 rounded-full bg-gradient-to-r from-error-500 to-warning-500"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8 }}
              />
            </div>
            
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">Before: ${optimizationImpact.before.costPerMonth}/mo</span>
              <span className="text-sm text-gray-500">After: ${optimizationImpact.after.costPerMonth}/mo</span>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-700">Performance Impact</h4>
              <span className="text-sm font-medium text-success-600">
                {optimizationImpact.savings.pageLoadTimePercentage}% faster page load
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-4">
              <motion.div 
                className="h-4 rounded-full bg-gradient-to-r from-error-500 to-success-500"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </div>
            
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-500">Before: {optimizationImpact.before.pageLoadTime}s</span>
              <span className="text-sm text-gray-500">After: {optimizationImpact.after.pageLoadTime}s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonCalculator;