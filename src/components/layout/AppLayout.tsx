import React from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface AppLayoutProps {
  children: React.ReactNode;
}

const sidebarLinks = [
  { name: 'Dashboard', path: '/', icon: 'ChartBar' },
  { name: 'Carbon Calculator', path: '/calculator', icon: 'Calculator' },
  { name: 'Code Analyzer', path: '/analyzer', icon: 'Code' },
  { name: 'Infrastructure', path: '/infrastructure', icon: 'Server' },
  { name: 'Compliance', path: '/compliance', icon: 'Shield' },
  { name: 'Settings', path: '/settings', icon: 'Settings' },
];

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isSidebarOpen ? 0 : -280 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r border-gray-200 shadow-lg"
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600" />
            <span className="text-xl font-semibold text-gray-900">GitGreener</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="p-4 space-y-1">
          {sidebarLinks.map((link) => (
            <a
              key={link.path}
              href={link.path}
              className="flex items-center space-x-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-primary-50 hover:text-primary-700 transition-colors"
            >
              <span className="text-lg">{link.icon}</span>
              <span>{link.name}</span>
            </a>
          ))}
        </nav>
      </motion.aside>

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-gray-900/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-20 h-16 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex h-full items-center justify-between px-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                Documentation
              </Button>
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary-500 to-primary-600" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;