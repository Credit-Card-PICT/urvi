import {
  TemplateConfig,
  LayoutType,
  defaultTemplate,
  travelTemplate,
  hotelTemplate,
  shoppingTemplate,
  forexTemplate
} from './modules';

// Re-export the types for convenience
export type { TemplateConfig };
export type { LayoutType };

// Re-export the individual templates
export { defaultTemplate, travelTemplate, hotelTemplate, shoppingTemplate, forexTemplate };

// Combined templates object
export const templates: Record<string, TemplateConfig> = {
  default: defaultTemplate,
  travel: travelTemplate,
  hotel: hotelTemplate,
  shopping: shoppingTemplate,
  forex: forexTemplate
};