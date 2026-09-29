import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrainCircuit, LineChart, Menu, LayoutDashboard } from 'lucide-react';
import { AppContent } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  // Getting login state from context
  const { isLoggedin } = useContext(AppContent);

  return (
    <nav className="w-full fixed top-0 z-50 bg-brand-primary/80 backdrop-blur-md border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <div className="bg-brand-surface p-1.5 rounded-lg border border-brand-border">
              <BrainCircuit className="w-6 h-6 text-brand-indigo" />
            </div>
            <span className="text-xl font-bold text-white tracking-wide">
              FinAgent<span className="text-brand-blue">X</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-brand-muted hover:text-white transition-colors text-sm font-medium">
              Capabilities
            </a>
            <a href="#agents" className="text-brand-muted hover:text-white transition-colors text-sm font-medium">
              AI Agents
            </a>
            <a href="#portfolio" className="text-brand-muted hover:text-white transition-colors text-sm font-medium">
              Portfolio Intelligence
            </a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {isLoggedin ? (
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-blue hover:bg-blue-600 text-white font-medium text-sm transition-colors shadow-lg shadow-brand-blue/20"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Go to Dashboard
                </button>
            ) : (
                <>
                  <button 
                    onClick={() => navigate('/login')}
                    className="hidden md:block text-brand-muted hover:text-white font-medium text-sm transition-colors"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => navigate('/login')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-blue hover:bg-blue-600 text-white font-medium text-sm transition-colors shadow-lg shadow-brand-blue/20"
                  >
                    <LineChart className="w-4 h-4" />
                    Get Started
                  </button>
                </>
            )}
            
            {/* Mobile Menu Icon */}
            <button className="md:hidden text-brand-muted hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;