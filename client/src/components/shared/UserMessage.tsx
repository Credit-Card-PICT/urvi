import React from 'react';

interface UserMessageProps {
  content: string;
}

const UserMessage: React.FC<UserMessageProps> = ({ content }) => {
  return (
    <div className="flex items-start justify-end mb-4">
      <div className="bg-primary/10 dark:bg-primary/20 text-gray-800 dark:text-gray-100 rounded-lg py-2 px-4 max-w-[80%]">
        <p className="text-sm">{content}</p>
      </div>
      <div className="w-8 h-8 rounded-full bg-primary/20 dark:bg-primary/30 flex items-center justify-center ml-2">
        <span className="material-icons text-primary dark:text-blue-300 text-sm">person</span>
      </div>
    </div>
  );
};

export default UserMessage;