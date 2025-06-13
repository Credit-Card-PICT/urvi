import React from 'react';

interface SuggestionChipProps {
  icon: string;
  text: string;
  onClick: () => void;
}

const SuggestionChip: React.FC<SuggestionChipProps> = ({ icon, text, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="suggestion-chip text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full px-3 py-1 mr-2 hover:bg-primary/10 dark:hover:bg-blue-900/30 hover:text-primary dark:hover:text-blue-300"
    >
      <span className="material-icons text-sm mr-1 align-text-bottom">{icon}</span>
      {text}
    </button>
  );
};

export default SuggestionChip;