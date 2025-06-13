import React, { ReactNode, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ThemeToggle from './ThemeToggle';
import MaterialIcons from './MaterialIcons';
import { Message } from '@/types';
import { Link, useLocation } from 'react-router-dom';
import { useChatContext } from '@/context/ChatContext';
import { ChatSession } from '@/context/ChatContext'; // Import ChatSession type

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check for saved preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    return savedTheme 
      ? savedTheme === 'dark' 
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Use useChatContext to get the chat states and actions
  const chatContext = useChatContext();
  const location = useLocation();

  // Determine the current active context for the sidebar
  const currentContextKey = location.pathname === '/task-manager' ? 'taskManager' : 'main';

  // Effect to update the active context in ChatContext
  useEffect(() => {
    chatContext.setActiveContext(currentContextKey);
  }, [currentContextKey, chatContext.setActiveContext]);

  // Get the current chat state and functions based on the active context
  const { messages, activeModule, isTyping, sessions, activeSessionId } = chatContext[currentContextKey];

  const handleNewChat = () => {
    const newSession = chatContext.createSession('New Conversation', 'How can I help you today?');
    chatContext.addSession(newSession, currentContextKey);
    setIsSidebarOpen(false);
  };

  const handleSessionSelect = (sessionId: string) => {
    chatContext.setActiveSession(sessionId, currentContextKey);
    setIsSidebarOpen(false);
  };

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save preference
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <MaterialIcons />
      <div className={`min-h-screen flex flex-col transition-colors duration-200 ${
        darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}>
        {/* Sidebar */}
        <Sidebar 
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          chatSessions={sessions}
          activeSessionId={activeSessionId}
          onSessionSelect={handleSessionSelect}
          onNewChat={handleNewChat}
          darkMode={darkMode}
        />
        
        {/* Overlay that appears when sidebar is open */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        {/* Main content area */}
        <div className="flex-grow flex flex-col h-screen overflow-hidden">
          {/* Header with sidebar toggle and theme toggle - fixed at top */}
          <header className={`p-3 flex justify-between items-center sticky top-0 z-10 ${
            darkMode ? 'bg-gray-800' : 'bg-white border-b border-gray-200'
          }`}>
            <button 
              onClick={toggleSidebar}
              className={`rounded-full p-1.5 ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
              }`}
              aria-label="Toggle sidebar"
            >
              <span className="material-icons">menu</span>
            </button>
            <div className="font-semibold text-lg">SmartRecommend</div>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center px-3 py-1.5 text-sm border border-indigo-200 rounded-md hover:bg-indigo-50 text-indigo-700"
              >
                Home
              </Link>
              <Link
                to="/task-manager"
                className="flex items-center px-3 py-1.5 text-sm border border-indigo-200 rounded-md hover:bg-indigo-50 text-indigo-700"
              >
                Task Manager
              </Link>
              <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            </div>
          </header>
          
          {/* Main content - scrollable area */}
          <main className="flex-grow overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;