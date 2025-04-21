import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Cloud, Download, Globe, Lock, Settings as SettingsIcon, User } from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'integrations', label: 'Integrations', icon: Cloud },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'preferences', label: 'Preferences', icon: SettingsIcon },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="card p-1">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    tab.id === activeTab
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon className="h-5 w-5 mr-3" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
        
        <div className="lg:col-span-3">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="card p-6"
          >
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Settings</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 rounded-full bg-secondary-100 flex items-center justify-center text-secondary-600 text-xl font-bold">
                      MS
                    </div>
                    <div>
                      <button className="btn btn-secondary text-sm">Update Photo</button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        className="input"
                        defaultValue="Maria"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        className="input"
                        defaultValue="Santos"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="input"
                        defaultValue="maria@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        className="input"
                        defaultValue="EcoTech Solutions"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <button className="btn btn-primary mr-2">
                      Save Changes
                    </button>
                    <button className="btn btn-ghost">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'integrations' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Cloud Integrations</h2>
                
                <div className="space-y-6">
                  <div className="card p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-orange-100 text-orange-600 flex items-center justify-center rounded-lg">
                          AWS
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Amazon Web Services</h3>
                          <p className="text-sm text-gray-500">Connect your AWS account for scanning</p>
                        </div>
                      </div>
                      <button className="btn btn-primary text-sm">Connect</button>
                    </div>
                  </div>
                  
                  <div className="card p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-blue-100 text-blue-600 flex items-center justify-center rounded-lg">
                          AZ
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Microsoft Azure</h3>
                          <p className="text-sm text-gray-500">Connect your Azure account for scanning</p>
                        </div>
                      </div>
                      <button className="btn btn-primary text-sm">Connect</button>
                    </div>
                  </div>
                  
                  <div className="card p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-green-100 text-green-600 flex items-center justify-center rounded-lg">
                          GC
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Google Cloud Platform</h3>
                          <p className="text-sm text-gray-500">Connect your GCP account for scanning</p>
                        </div>
                      </div>
                      <button className="btn btn-primary text-sm">Connect</button>
                    </div>
                  </div>
                  
                  <div className="card p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-purple-100 text-purple-600 flex items-center justify-center rounded-lg">
                          CF
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Cloudflare</h3>
                          <p className="text-sm text-gray-500">Connect your Cloudflare account for scanning</p>
                        </div>
                      </div>
                      <button className="btn btn-primary text-sm">Connect</button>
                    </div>
                  </div>
                  
                  <div className="card p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-gray-100 text-gray-600 flex items-center justify-center rounded-lg">
                          <Globe className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">GitHub</h3>
                          <p className="text-sm text-gray-500">Connect your GitHub repositories for code analysis</p>
                        </div>
                      </div>
                      <button className="btn btn-primary text-sm">Connect</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Email Notifications</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Weekly Reports</h4>
                          <p className="text-xs text-gray-500">Receive weekly summaries of your carbon footprint</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Optimization Alerts</h4>
                          <p className="text-xs text-gray-500">Be notified when new optimization opportunities are found</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Code Analysis Results</h4>
                          <p className="text-xs text-gray-500">Get notifications when code scans are completed</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Marketing Updates</h4>
                          <p className="text-xs text-gray-500">Receive news and updates about GreenStack AI</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">In-App Notifications</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Critical Alerts</h4>
                          <p className="text-xs text-gray-500">Be notified about critical efficiency issues</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Green Score Changes</h4>
                          <p className="text-xs text-gray-500">Be notified when your Green Score changes significantly</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <button className="btn btn-primary mr-2">
                      Save Preferences
                    </button>
                    <button className="btn btn-ghost">
                      Reset to Default
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'security' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Change Password</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Current Password
                        </label>
                        <input
                          type="password"
                          id="currentPassword"
                          className="input"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          New Password
                        </label>
                        <input
                          type="password"
                          id="newPassword"
                          className="input"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          className="input"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <button className="btn btn-primary">
                        Update Password
                      </button>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Two-Factor Authentication</h3>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Enable 2FA</h4>
                        <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                      </label>
                    </div>
                    
                    <button className="btn btn-secondary text-sm">
                      Set Up Two-Factor Authentication
                    </button>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">API Access</h3>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">API Keys</h4>
                        <p className="text-xs text-gray-500">Manage API access to your GreenStack AI data</p>
                      </div>
                      <button className="btn btn-secondary text-sm">
                        Generate API Key
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'preferences' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">System Preferences</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Display Settings</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-1">
                          Theme
                        </label>
                        <select id="theme" className="input">
                          <option>Light</option>
                          <option>Dark</option>
                          <option>System</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700 mb-1">
                          Date Format
                        </label>
                        <select id="dateFormat" className="input">
                          <option>MM/DD/YYYY</option>
                          <option>DD/MM/YYYY</option>
                          <option>YYYY-MM-DD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Measurement Units</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="carbonUnit" className="block text-sm font-medium text-gray-700 mb-1">
                          Carbon Emission Units
                        </label>
                        <select id="carbonUnit" className="input">
                          <option>kg CO₂e (kilograms)</option>
                          <option>t CO₂e (tonnes)</option>
                          <option>lb CO₂e (pounds)</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="energyUnit" className="block text-sm font-medium text-gray-700 mb-1">
                          Energy Units
                        </label>
                        <select id="energyUnit" className="input">
                          <option>kWh (kilowatt-hours)</option>
                          <option>MWh (megawatt-hours)</option>
                          <option>BTU (British Thermal Units)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Data Export</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="exportFormat" className="block text-sm font-medium text-gray-700 mb-1">
                          Default Export Format
                        </label>
                        <select id="exportFormat" className="input">
                          <option>CSV</option>
                          <option>JSON</option>
                          <option>PDF</option>
                          <option>Excel</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <button className="btn btn-secondary text-sm flex items-center">
                        <Download className="h-4 w-4 mr-2" />
                        Export All Data
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <button className="btn btn-primary mr-2">
                      Save Preferences
                    </button>
                    <button className="btn btn-ghost">
                      Reset to Default
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;