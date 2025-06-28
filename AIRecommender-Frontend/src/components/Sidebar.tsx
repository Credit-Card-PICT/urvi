import React from 'react';
import { Message } from '@/types';

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messages: Message[];
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  chatSessions: ChatSession[];
  activeSessionId: string | null;
  onSessionSelect: (sessionId: string) => void;
  onNewChat: () => void;
  darkMode: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  chatSessions,
  activeSessionId,
  onSessionSelect,
  onNewChat,
  darkMode
}) => {
  return (
    <div 
      className={`fixed top-0 left-0 h-full w-72 shadow-lg transition-transform duration-300 ease-in-out z-40 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Chat History</h2>
          <button 
            onClick={onClose}
            className={`rounded-full p-1.5 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <span className="material-icons">close</span>
          </button>
        </div>
        
        <button
          onClick={onNewChat}
          className={`w-full flex items-center p-3 rounded-md mb-4 ${
            darkMode 
              ? 'bg-gray-700 hover:bg-gray-600 text-white' 
              : 'bg-primary/10 hover:bg-primary/20 text-primary'
          }`}
        >
          <span className="material-icons mr-2">add</span>
          <span>New Chat</span>
        </button>
        
        <div className="mt-4 space-y-2 overflow-y-auto max-h-[calc(100vh-150px)]">
          {chatSessions.length === 0 ? (
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-center p-4`}>
              No chat history yet
            </div>
          ) : (
            chatSessions.map((session) => (
              <div
                key={session.id}
                onClick={() => onSessionSelect(session.id)}
                className={`p-3 rounded-md cursor-pointer transition-colors ${
                  session.id === activeSessionId 
                    ? (darkMode ? 'bg-gray-700' : 'bg-primary/10')
                    : (darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="font-medium truncate">{session.title}</span>
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {new Date(session.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className={`text-sm truncate mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {session.lastMessage}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;