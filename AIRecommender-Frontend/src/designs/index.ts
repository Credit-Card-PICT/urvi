// Import layout components
import TravelLayout from './travel/TravelLayout';
import HotelLayout from './hotel/HotelLayout';
import ShoppingLayout from './shopping/ShoppingLayout';
import DefaultLayout from './default/DefaultLayout';
import ForexLayout from './forex/ForexLayout';

// Import background components
import TravelBackground from './travel/background';
import HotelBackground from './hotel/background';
import ShoppingBackground from './shopping/background';
import DefaultBackground from './default/background';
import ForexBackground from './forex/background';

// Types for each design
import { TemplateConfig } from '../config/templates';
import { ResponseItem } from '../config/dummyData/types';

// Design options interface
export interface DesignOption {
  id: string;
  name: string;
  description: string;
  background: string;
  inputStyles: {
    border: string;
    focus: string;
    button: string;
  };
  LayoutComponent: React.FC<{
    responses: ResponseItem[];
    template: TemplateConfig;
  }>;
  BackgroundComponent: React.FC;
}

// Collect all designs in a single object for easy import
export const designs: Record<string, DesignOption> = {
  default: {
    id: 'default',
    name: 'Default',
    description: 'A neutral design with clean typography and generous spacing.',
    background: 'bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 home-theme',
    inputStyles: {
      border: 'border-gray-300 dark:border-gray-600',
      focus: 'focus:ring-blue-500',
      button: 'bg-blue-600 hover:bg-blue-700'
    },
    LayoutComponent: DefaultLayout,
    BackgroundComponent: DefaultBackground
  },
  travel: {
    id: 'travel',
    name: 'Travel',
    description: 'Modern design focused on flight information and travel deals.',
    background: 'bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/20 travel-theme',
    inputStyles: {
      border: 'border-blue-300 dark:border-blue-600',
      focus: 'focus:ring-blue-500',
      button: 'bg-blue-600 hover:bg-blue-700'
    },
    LayoutComponent: TravelLayout,
    BackgroundComponent: TravelBackground
  },
  hotel: {
    id: 'hotel',
    name: 'Hotel',
    description: 'Rich design highlighting accommodations and amenities.',
    background: 'bg-gradient-to-b from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/20 hotel-theme',
    inputStyles: {
      border: 'border-amber-300 dark:border-amber-600',
      focus: 'focus:ring-amber-500',
      button: 'bg-amber-600 hover:bg-amber-700'
    },
    LayoutComponent: HotelLayout,
    BackgroundComponent: HotelBackground
  },
  shopping: {
    id: 'shopping',
    name: 'Shopping',
    description: 'Product-focused grid layout for shopping recommendations.',
    background: 'bg-gradient-to-b from-green-50 to-teal-50 dark:from-green-900/30 dark:to-teal-900/20 shopping-theme',
    inputStyles: {
      border: 'border-green-300 dark:border-green-600',
      focus: 'focus:ring-green-500',
      button: 'bg-green-600 hover:bg-green-700'
    },
    LayoutComponent: ShoppingLayout,
    BackgroundComponent: ShoppingBackground
  },
  forex: {
    id: 'forex',
    name: 'Forex',
    description: 'Specialized design for forex exchange rates and trading recommendations.',
    background: 'bg-gradient-to-b from-cyan-50 to-sky-50 dark:from-cyan-900/30 dark:to-sky-900/20 forex-theme',
    inputStyles: {
      border: 'border-cyan-300 dark:border-cyan-600',
      focus: 'focus:ring-cyan-500',
      button: 'bg-cyan-600 hover:bg-cyan-700'
    },
    LayoutComponent: ForexLayout,
    BackgroundComponent: ForexBackground
  }
};

// Helper function to get design by ID
export const getDesignById = (id: string): DesignOption => {
  return designs[id] || designs.default;
};

// Helper function to get all available designs
export const getAllDesigns = (): DesignOption[] => {
  return Object.values(designs);
};