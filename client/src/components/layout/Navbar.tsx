import React from 'react';
import { useChatContext } from '@/context/ChatContext';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onModuleSwitcherClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onModuleSwitcherClick }) => {
  const { activeModule } = useChatContext();
  
  return (
    <header className="h-16 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 h-full flex justify-between items-center">
        <div className="flex items-center">
          <button className="mr-2 p-2 text-gray-500 md:hidden hover:bg-gray-100 rounded-md">
            <span className="material-icons">menu</span>
          </button>
          <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center mr-3 text-white">
            <span className="material-icons text-primary-foreground">smart_toy</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-900">SmartRecommend</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to="/task-manager"
            className="flex items-center px-3 py-1.5 text-sm border border-indigo-200 rounded-md hover:bg-indigo-50 text-indigo-700"
          >
            <span className="material-icons-outlined text-indigo-400 text-sm mr-1 align-text-bottom">task_alt</span>
            Task Manager
          </Link>
          <div className="hidden md:block">
            <button className="px-3 py-1.5 text-sm border border-gray-200 rounded-md hover:bg-gray-50">
              <span className="material-icons-outlined text-gray-400 text-sm mr-1 align-text-bottom">lightbulb</span>
              Manage Cards
            </button>
          </div>
          <button 
            id="theme-toggle"
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <span className="material-icons text-gray-700">light_mode</span>
          </button>
          <button 
            id="logout-button"
            className="hidden md:flex p-2 text-sm font-medium text-gray-700 items-center"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
