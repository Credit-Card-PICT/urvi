import React from 'react';
import IntentClassifierDemo from '../components/IntentClassifierDemo';

const IntentClassifierPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Intent Classifier Demo</h1>
      <IntentClassifierDemo />
    </div>
  );
};

export default IntentClassifierPage;