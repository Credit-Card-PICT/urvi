import React from 'react';

interface TopicSelectorProps {
  currentTopic: string;
  setTopic: (topic: string) => void;
}

const TopicSelector: React.FC<TopicSelectorProps> = ({ currentTopic, setTopic }) => {
  const topics = [
    { id: 'default', name: 'Default', icon: 'home' },
    { id: 'travel', name: 'Travel', icon: 'flight' },
    { id: 'hotel', name: 'Hotels', icon: 'hotel' },
    { id: 'shopping', name: 'Shopping', icon: 'shopping_bag' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="material-icons text-primary dark:text-blue-400 mr-2">smart_toy</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">SmartRecommend</span>
          </div>
          
          <div className="flex space-x-1 sm:space-x-2">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setTopic(topic.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-all duration-300 ${
                  currentTopic === topic.id
                    ? 'bg-primary/10 text-primary dark:bg-blue-900/50 dark:text-blue-300'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <span className="material-icons text-sm mr-1">{topic.icon}</span>
                <span className="hidden sm:inline">{topic.name}</span>
              </button>
            ))}
          </div>
          
          <div className="flex items-center">
            <select
              value={currentTopic}
              onChange={(e) => setTopic(e.target.value)}
              className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-primary dark:focus:ring-blue-400 focus:border-primary dark:focus:border-blue-500 block p-2.5 sm:hidden"
            >
              {topics.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicSelector;