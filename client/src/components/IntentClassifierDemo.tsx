import React, { useState } from 'react';
import { apiRequest } from '../lib/queryClient';

interface ClassificationResult {
  suggested_ui: 'flights' | 'hotel' | 'shopping' | 'default';
}

const IntentClassifierDemo: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      setError('Please enter a query');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/classify-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      setResult(data as ClassificationResult);
    } catch (err) {
      setError('Error classifying intent. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Intent Classifier</h2>
      <p className="mb-4 text-gray-600 dark:text-gray-300">
        Enter a query to detect which UI should be displayed based on user intent.
      </p>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col space-y-2">
          <label htmlFor="query" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            User Query
          </label>
          <input
            id="query"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., I want to book a flight to Paris"
            className="p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className={`mt-4 w-full py-2 px-4 rounded-md text-white font-medium ${
            isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
          } transition-colors`}
        >
          {isLoading ? 'Classifying...' : 'Classify Intent'}
        </button>
      </form>
      
      {error && (
        <div className="p-3 mb-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {result && (
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
          <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-white">
            Classification Result:
          </h3>
          <div className="bg-white dark:bg-gray-800 p-3 rounded-md border border-gray-200 dark:border-gray-600 font-mono">
            {JSON.stringify(result, null, 2)}
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-md text-blue-800 dark:text-blue-200">
            <p className="font-medium">Suggested UI: {result.suggested_ui}</p>
            <p className="mt-1 text-sm">
              {result.suggested_ui === 'flights' && 'Flight booking interface would be shown'}
              {result.suggested_ui === 'hotel' && 'Hotel booking interface would be shown'}
              {result.suggested_ui === 'shopping' && 'Shopping interface would be shown'}
              {result.suggested_ui === 'default' && 'Default interface would be shown'}
            </p>
          </div>
        </div>
      )}
      
      <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
        <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-white">Sample Queries</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[
            'I want to book a flight from Pune to Bangalore',
            'Show me hotels in Shimla',
            'I need a new backpack for college',
            'Which credit card gives the best rewards?',
            'Looking to fly next weekend',
            'Need a hotel with a pool'
          ].map((sampleQuery, index) => (
            <button
              key={index}
              onClick={() => setQuery(sampleQuery)}
              className="text-left p-2 text-sm bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md"
            >
              {sampleQuery}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntentClassifierDemo;