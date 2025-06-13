import React, { useEffect, useState } from 'react';
import { ResponseItem } from '../config/dummyData/types';
import { LayoutType, TemplateConfig } from '../config/templates';
import VerticalLayout from './layouts/VerticalLayout';
import TimelineLayout from './layouts/TimelineLayout';
import CardListLayout from './layouts/CardListLayout';
import ProductGridLayout from './layouts/ProductGridLayout';
import ForexLayout from '../designs/forex/ForexLayout';

interface ResponseDisplayProps {
  responses: ResponseItem[];
  template: TemplateConfig;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ responses, template }) => {
  const [mountedLayout, setMountedLayout] = useState<LayoutType>(template.layout);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Handle transitions when the template layout changes
  useEffect(() => {
    if (mountedLayout !== template.layout) {
      setIsTransitioning(true);
      
      // After a brief delay, update the mounted layout
      const timer = setTimeout(() => {
        setMountedLayout(template.layout);
        setIsTransitioning(false);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [template.layout, mountedLayout]);
  
  // Select the layout component based on the template layout type
  const renderLayout = (layoutType: LayoutType) => {
    switch (layoutType) {
      case 'vertical':
        return <VerticalLayout responses={responses} template={template} />;
      case 'timeline':
        return <TimelineLayout responses={responses} template={template} />;
      case 'cardList':
        return <CardListLayout responses={responses} template={template} />;
      case 'productGrid':
        return <ProductGridLayout responses={responses} template={template} />;
      case 'forex':
        return <ForexLayout responses={responses} template={template} />;
      default:
        return <VerticalLayout responses={responses} template={template} />;
    }
  };

  return (
    <div className={`py-6 transition-all duration-500 ease-in-out module-transition ${
      isTransitioning ? 'opacity-0 transform translate-y-5' : 'opacity-100'
    }`}>
      {renderLayout(mountedLayout)}
    </div>
  );
};

export default ResponseDisplay;