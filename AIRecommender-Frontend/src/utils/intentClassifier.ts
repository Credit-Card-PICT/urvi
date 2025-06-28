import { moduleKeywords } from './keywordTriggers';

/**
 * Type definition for UI categories
 */
export type UICategory = 'flights' | 'hotel' | 'shopping' | 'default';

/**
 * Maps our internal module types to the UI categories
 */
const moduleToUIMapping: Record<string, UICategory> = {
  travel: 'flights',
  hotel: 'hotel',
  shopping: 'shopping',
  forex: 'default'
};

/**
 * Classifies a user query and returns the suggested UI
 * Using the existing keyword detection logic but with UI-specific output
 * @param query The user query to classify
 * @returns An object with the suggested UI category
 */
export function classifyIntent(query: string): { suggested_ui: UICategory } {
  const lowerQuery = query.toLowerCase();
  
  // Check each module's keywords
  let earliestMatch = { module: 'default', position: Infinity };
  
  for (const [moduleType, keywords] of Object.entries(moduleKeywords)) {
    for (const keyword of keywords) {
      const position = lowerQuery.indexOf(keyword);
      if (position !== -1 && position < earliestMatch.position) {
        earliestMatch = {
          module: moduleType,
          position: position
        };
        // For optimal performance, we could break here on first match,
        // but we want to find the earliest occurrence of any keyword
      }
    }
  }
  
  // Map the internal module to UI category
  const suggestedUI = moduleToUIMapping[earliestMatch.module] || 'default';
  
  return { suggested_ui: suggestedUI };
}