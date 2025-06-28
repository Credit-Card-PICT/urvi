import React from 'react';

const TaskManagerPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50 dark:bg-indigo-900/30">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">Task Manager</h1>
        <p className="text-lg text-gray-700 dark:text-gray-200 mb-2">
          This page is dedicated to LLM-powered sub-task division and project breakdowns.
        </p>
        {/* Add your LLM interaction UI here in the future */}
      </div>
    </div>
  );
};

export default TaskManagerPage;
