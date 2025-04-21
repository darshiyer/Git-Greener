import React, { useState } from 'react';
import { DownloadCloud, FileText, Filter, Plus } from 'lucide-react';
import { complianceReports } from '../data/mockData';

const Compliance: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  const filteredReports = activeFilter === 'all' 
    ? complianceReports 
    : complianceReports.filter(report => report.type.toLowerCase() === activeFilter.toLowerCase());
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-700';
      case 'ready': return 'bg-warning-50 text-warning-700';
      case 'submitted': return 'bg-success-50 text-success-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ESG': return 'bg-primary-50 text-primary-700';
      case 'Carbon Offset': return 'bg-success-50 text-success-700';
      case 'Internal': return 'bg-secondary-50 text-secondary-700';
      case 'Regulatory': return 'bg-warning-50 text-warning-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Compliance Reports</h1>
        <button className="btn btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          Generate New Report
        </button>
      </div>
      
      <div className="card p-6 bg-gradient-to-r from-primary-600 to-primary-500 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">ESG Reporting Made Easy</h2>
            <p className="opacity-80 mb-4 md:mb-0">
              Generate standardized environmental reports for sustainability disclosures and carbon offsetting.
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="btn bg-white text-primary-600 hover:bg-gray-100">
              <FileText className="h-4 w-4 mr-2" />
              Templates
            </button>
            <button className="btn bg-white/20 text-white hover:bg-white/30">
              Learn More
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
            activeFilter === 'all'
              ? 'bg-gray-200 text-gray-800'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => setActiveFilter('all')}
        >
          All Reports
        </button>
        <button
          className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
            activeFilter === 'ESG'
              ? 'bg-primary-50 text-primary-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => setActiveFilter('ESG')}
        >
          ESG Reports
        </button>
        <button
          className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
            activeFilter === 'Carbon Offset'
              ? 'bg-success-50 text-success-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => setActiveFilter('Carbon Offset')}
        >
          Carbon Offset
        </button>
        <button
          className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
            activeFilter === 'Internal'
              ? 'bg-secondary-50 text-secondary-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => setActiveFilter('Internal')}
        >
          Internal
        </button>
        <button
          className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
            activeFilter === 'Regulatory'
              ? 'bg-warning-50 text-warning-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => setActiveFilter('Regulatory')}
        >
          Regulatory
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Report Name</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Type</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Date</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Emissions</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredReports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50">
                <td className="py-4 px-4 text-sm font-medium text-gray-900">{report.name}</td>
                <td className="py-4 px-4 text-sm text-gray-500">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(report.type)}`}>
                    {report.type}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm text-gray-500">{report.createdAt}</td>
                <td className="py-4 px-4 text-sm text-gray-500">{report.metrics.netEmissions} kg CO₂e</td>
                <td className="py-4 px-4 text-sm text-gray-500">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                    {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                      <FileText className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                      <DownloadCloud className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="card p-6 bg-gray-50">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Need Custom Reporting?</h3>
            <p className="text-sm text-gray-600 mb-4 md:mb-0">
              We can help you create tailored sustainability reports for specific stakeholders or regulatory requirements.
            </p>
          </div>
          <button className="btn btn-secondary">
            Request Custom Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Compliance;