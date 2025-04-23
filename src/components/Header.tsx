import React, { useState } from 'react';
import { Bell, Search, Settings } from 'lucide-react';
import { greenScoreMetrics } from '../data/mockData';
import { getScoreColor } from '../lib/utils';

const Header: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  
  return (
    <header className="bg-gray-50 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex">
            {/* Removed the 'GreenStack' text */}
          </div>
          
          <div className="flex items-center space-x-4">
            {!searchOpen ? (
              <button 
                onClick={() => setSearchOpen(true)}
                className="p-2 text-gray-500 rounded-full hover:text-gray-900 hover:bg-gray-100"
              >
                <Search size={20} />
              </button>
            ) : (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 rounded-full py-2 pl-10 pr-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  autoFocus
                  onBlur={() => setSearchOpen(false)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
            )}
            
            <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
              <span className="text-sm font-medium mr-2">Green Score:</span>
              <span className={`text-sm font-semibold ${getScoreColor(greenScoreMetrics.overall)}`}>
                {greenScoreMetrics.overall}
              </span>
            </div>
            
            <button className="p-2 text-gray-500 rounded-full hover:text-gray-900 hover:bg-gray-100 relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-error-500 text-white text-xs flex items-center justify-center">
                3
              </span>
            </button>
            
            <button className="p-2 text-gray-500 rounded-full hover:text-gray-900 hover:bg-gray-100">
              <Settings size={20} />
            </button>
            
            <button className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-secondary text-white flex items-center justify-center">
                MS
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;