import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit, LogOut, User, Bell } from 'lucide-react';
import { AppContent } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const { userData, setIsLoggedin, setUserData, backendUrl } = useContext(AppContent);

  const logoutHandler = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/logout');
      if (data.success) {
        setIsLoggedin(false);
        setUserData(false);
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="w-full sticky top-0 z-50 bg-brand-primary border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div onClick={() => navigate('/dashboard')} className="flex items-center gap-2 cursor-pointer">
            <div className="bg-brand-surface p-1.5 rounded-lg border border-brand-border">
              <BrainCircuit className="w-5 h-5 text-brand-indigo" />
            </div>
            <span className="text-xl font-bold text-white tracking-wide">
              FinAgent<span className="text-brand-blue">X</span>
            </span>
          </div>

          {/* Right Side: Profile & Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-brand-muted hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            
            {/* User Profile Dropdown / Info */}
            <div className="flex items-center gap-3 pl-4 border-l border-brand-border">
              <div className="w-8 h-8 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center">
                <span className="text-sm font-semibold text-brand-blue uppercase">
                  {userData ? userData.name[0] : <User className="w-4 h-4" />}
                </span>
              </div>
              <div className="hidden md:block text-sm">
                <p className="text-white font-medium">{userData ? userData.name : 'Investor'}</p>
              </div>
              <button 
                onClick={logoutHandler}
                className="ml-2 p-2 text-brand-danger hover:bg-brand-danger/10 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:block">Logout</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;