import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, FileWarning, Upload, X } from 'lucide-react';
import { codeIssues } from '../data/mockData';

const CodeAnalyzer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'issues' | 'recommendations'>('issues');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  
  const filteredIssues = selectedSeverity === 'all' 
    ? codeIssues 
    : codeIssues.filter(issue => issue.severity === selectedSeverity);
  
  const severityCounts = {
    critical: codeIssues.filter(issue => issue.severity === 'critical').length,
    high: codeIssues.filter(issue => issue.severity === 'high').length,
    medium: codeIssues.filter(issue => issue.severity === 'medium').length,
    low: codeIssues.filter(issue => issue.severity === 'low').length
  };
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-error-50 text-error-700';
      case 'high': return 'bg-error-50 text-error-600';
      case 'medium': return 'bg-warning-50 text-warning-700';
      case 'low': return 'bg-primary-50 text-primary-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Code Analyzer</h1>
        <div className="flex space-x-2">
          <button className="btn btn-ghost">
            Export Results
          </button>
          <button className="btn btn-primary">
            <Upload className="h-4 w-4 mr-2" />
            Analyze New Code
          </button>
        </div>
      </div>
      
      <div className="card p-8 border-dashed border-2 border-gray-300">
        <div className="flex flex-col items-center justify-center">
          <FileWarning className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">Analyze Your Codebase</h3>
          <p className="text-gray-500 text-center mb-6 max-w-md">
            Upload your code repository or connect to your GitHub account to analyze and optimize your code for sustainability.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="btn btn-primary">
              <Upload className="h-4 w-4 mr-2" />
              Upload Repository
            </button>
            <button className="btn btn-secondary">
              Connect to GitHub
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex space-x-2 border-b border-gray-200">
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'issues'
              ? 'text-primary-600 border-b-2 border-primary-500'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => setActiveTab('issues')}
        >
          Issues ({codeIssues.length})
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'recommendations'
              ? 'text-primary-600 border-b-2 border-primary-500'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => setActiveTab('recommendations')}
        >
          Recommendations
        </button>
      </div>
      
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          className={`px-3 py-1.5 text-xs font-medium rounded-full ${
            selectedSeverity === 'all'
              ? 'bg-secondary-50 text-secondary-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setSelectedSeverity('all')}
        >
          All Issues ({codeIssues.length})
        </button>
        <button
          className={`px-3 py-1.5 text-xs font-medium rounded-full ${
            selectedSeverity === 'critical'
              ? 'bg-error-50 text-error-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setSelectedSeverity('critical')}
        >
          Critical ({severityCounts.critical})
        </button>
        <button
          className={`px-3 py-1.5 text-xs font-medium rounded-full ${
            selectedSeverity === 'high'
              ? 'bg-error-50 text-error-600'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setSelectedSeverity('high')}
        >
          High ({severityCounts.high})
        </button>
        <button
          className={`px-3 py-1.5 text-xs font-medium rounded-full ${
            selectedSeverity === 'medium'
              ? 'bg-warning-50 text-warning-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setSelectedSeverity('medium')}
        >
          Medium ({severityCounts.medium})
        </button>
        <button
          className={`px-3 py-1.5 text-xs font-medium rounded-full ${
            selectedSeverity === 'low'
              ? 'bg-primary-50 text-primary-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setSelectedSeverity('low')}
        >
          Low ({severityCounts.low})
        </button>
      </div>
      
      <div className="space-y-4">
        {filteredIssues.map((issue) => (
          <motion.div 
            key={issue.id} 
            className="card card-hover p-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start">
              <div className="mr-4">
                <AlertCircle 
                  className={`h-5 w-5 ${
                    issue.severity === 'critical' || issue.severity === 'high' 
                      ? 'text-error-500' 
                      : issue.severity === 'medium' 
                      ? 'text-warning-500' 
                      : 'text-primary-500'
                  }`} 
                />
              </div>
              
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h4 className="font-medium text-gray-900">{issue.file}</h4>
                  <span className="text-xs text-gray-500">Lines {issue.lineStart}-{issue.lineEnd}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getSeverityColor(issue.severity)}`}>
                    {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)}
                  </span>
                </div>
                
                <p className="text-sm text-gray-700 mb-3">{issue.description}</p>
                
                <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 mb-3 font-mono">
                  {issue.suggestion}
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center text-xs bg-error-50 text-error-700 px-2 py-1 rounded-full">
                    <span className="font-medium">CO₂ Impact:</span>
                    <span className="ml-1">{issue.impact.co2} kg/year</span>
                  </div>
                  
                  <div className="flex items-center text-xs bg-secondary-50 text-secondary-700 px-2 py-1 rounded-full">
                    <span className="font-medium">Performance Impact:</span>
                    <span className="ml-1">{issue.impact.performance}% slower</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="p-1.5 text-success-500 hover:bg-success-50 rounded">
                  <CheckCircle className="h-5 w-5" />
                </button>
                <button className="p-1.5 text-gray-400 hover:bg-gray-50 hover:text-gray-500 rounded">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CodeAnalyzer;