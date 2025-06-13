import React from 'react';
import { useChatContext } from '@/context/ChatContext';

interface ModuleDropdownProps {
  onClose: () => void;
}

const ModuleDropdown: React.FC<ModuleDropdownProps> = ({ onClose }) => {
  const { setActiveModule, addMessage } = useChatContext();
  
  const handleModuleSelect = (moduleType: string) => {
    setActiveModule(moduleType);
    onClose();
    
    // Add a system message about module change
    addMessage({
      role: 'assistant',
      content: `Switched to ${moduleType} module.`,
      moduleType: moduleType
    });
  };
  
  return (
    <div className="absolute right-4 top-16 mt-1 bg-white rounded-md shadow-lg border border-gray-200 z-10">
      <ul className="py-1">
        <li 
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm font-medium text-gray-700" 
          onClick={() => handleModuleSelect('home')}
        >
          Home
        </li>
        <li 
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm font-medium text-gray-700" 
          onClick={() => handleModuleSelect('travel')}
        >
          Travel
        </li>
        <li 
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm font-medium text-gray-700" 
          onClick={() => handleModuleSelect('hotel')}
        >
          Hotels
        </li>
        <li 
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm font-medium text-gray-700" 
          onClick={() => handleModuleSelect('shopping')}
        >
          Shopping
        </li>
      </ul>
    </div>
  );
};

export default ModuleDropdown;
