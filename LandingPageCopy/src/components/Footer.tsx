import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/70 backdrop-blur-md border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-sky-500 via-purple-500 to-orange-500 text-transparent bg-clip-text">
              TBD
            </Link>
            <p className="mt-4 text-gray-600">
              Empowering MSMEs with innovative financial solutions for sustainable growth.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900">Product</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/earn" className="text-gray-600 hover:text-purple-600">Earn</Link></li>
              <li><Link to="/manage" className="text-gray-600 hover:text-purple-600">Manage</Link></li>
              <li><Link to="/grow" className="text-gray-600 hover:text-purple-600">Grow</Link></li>
              <li><Link to="/dashboard" className="text-gray-600 hover:text-purple-600">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-purple-600">About</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-purple-600">Careers</Link></li>
              <li><Link to="/press" className="text-gray-600 hover:text-purple-600">Press</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-purple-600">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">Connect</h3>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-purple-600">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-600">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-600">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-600">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-100">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} TBD. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;