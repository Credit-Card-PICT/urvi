import React from 'react';
import { templates, TemplateConfig } from '../config/templates';
import ResponseDisplay from './ResponseDisplay';
import { ResponseItem } from '../config/dummyData/types';

interface TemplateWrapperProps {
  topic: string;
  responses: ResponseItem[];
}

const TemplateWrapper: React.FC<TemplateWrapperProps> = ({ topic, responses }) => {
  // Get the template configuration for the selected topic
  const template: TemplateConfig = templates[topic] || templates.default;
  
  return (
    <div className={`min-h-screen ${template.background} transition-all duration-500 ease-in-out`}>
      <div className="container mx-auto px-4 py-8">
        <ResponseDisplay 
          responses={responses} 
          template={template} 
        />
      </div>
    </div>
  );
};

export default TemplateWrapper;