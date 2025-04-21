import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart3, 
  Code, 
  Server, 
  Calculator, 
  FileText, 
  Settings as SettingsIcon,
  Leaf 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const navItems = [
  { icon: BarChart3, label: 'Dashboard', path: '/' },
  { icon: Code, label: 'Code Analyzer', path: '/code-analyzer' },
  { icon: Server, label: 'Infrastructure', path: '/infrastructure' },
  { icon: Calculator, label: 'Carbon Calculator', path: '/carbon-calculator' },
  { icon: FileText, label: 'Compliance', path: '/compliance' },
  { icon: SettingsIcon, label: 'Settings', path: '/settings' },
];

const Sidebar: React.FC = () => {
  return (
    <div className="hidden md:flex h-screen w-64 flex-col bg-white border-r border-gray-200">
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Leaf className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">GreenStack<span className="text-primary">AI</span></span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 pt-6 pb-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
              isActive
                ? "bg-primary-50 text-primary-700"
                : "text-gray-700 hover:bg-gray-100"
            )}
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn(
                  "mr-3 h-5 w-5",
                  isActive ? "text-primary-600" : "text-gray-500"
                )} />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="ml-auto h-2 w-2 rounded-full bg-primary-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="card p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Leaf className="h-5 w-5 text-primary" />
            <h4 className="font-medium text-gray-900">Go Premium</h4>
          </div>
          <p className="text-xs text-gray-600 mb-3">
            Unlock advanced features and detailed optimization reports.
          </p>
          <button className="btn btn-primary w-full">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;