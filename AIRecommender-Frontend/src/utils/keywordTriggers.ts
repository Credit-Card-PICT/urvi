import { ModuleType } from '../types';

/**
 * Keyword groups for each module type
 * These keywords are used to detect user intent and switch to the appropriate module
 */
export const moduleKeywords: Record<string, string[]> = {
  travel: [
    "flight", "flights", "airfare", "plane ticket", "cheap flights", "book flight", 
    "fly", "airline", "airlines", "air travel", "jet", "round trip", "one way", 
    "aviation", "layover", "international flight", "domestic flight", "economy class", 
    "business class", "first class", "flight deal", "ticket booking", "airport", 
    "departure", "arrival", "boarding", "luggage", "flight schedule", "air ticket", 
    "airfare deals", "travel", "trip", "journey", "vacation", "holiday"
  ],
  hotel: [
    "hotel", "hotels", "accommodation", "book hotel", "stay", "lodging", "resort", 
    "motel", "hostel", "bnb", "airbnb", "guest house", "room booking", "suite", 
    "check-in", "check-out", "hotel deals", "luxury hotel", "budget hotel", "villa", 
    "spa resort", "hotel reservation", "night stay", "room availability", "room service", 
    "bed and breakfast", "booking", "reservation"
  ],
  shopping: [
    "shopping", "shop", "ecommerce", "buy online", "discount", "sale", "purchase", 
    "online store", "amazon", "flipkart", "myntra", "clothing", "gadgets", "electronics", 
    "fashion", "order", "checkout", "cart", "wishlist", "retail", "apparel", "accessories", 
    "shoes", "bags", "beauty", "cosmetics", "store", "shopping spree", "product", "item", 
    "deal", "offer", "cashback", "promo code", "buy", "merchandise"
  ],
  forex: [
    "forex", "currency", "exchange rate", "foreign exchange", "trading", "fx", "currency pair",
    "currency trading", "exchange", "money transfer", "conversion rate", "euro", "dollar", "yen",
    "pound", "crypto", "cryptocurrency", "bitcoin", "ethereum", "financial markets", "market analysis",
    "chart", "technical analysis", "pip", "spread", "broker", "margin", "leverage", "trade"
  ]
};

/**
 * Detects the most relevant module based on keyword appearance in the user message
 * Returns the first module type that has a matching keyword in the user's message
 */
export function detectModuleFromMessage(message: string): ModuleType {
  const lowerMessage = message.toLowerCase();
  
  // Check each word/phrase in the message to find the earliest appearance of any keyword
  const moduleMatches: {module: ModuleType, position: number}[] = [];
  
  // For each module type, check if any of its keywords appear in the message
  for (const [moduleType, keywords] of Object.entries(moduleKeywords)) {
    for (const keyword of keywords) {
      const position = lowerMessage.indexOf(keyword);
      if (position !== -1) {
        moduleMatches.push({
          module: moduleType as ModuleType,
          position: position
        });
        // Once we find a match for this module, no need to check other keywords
        break;
      }
    }
  }
  
  // Sort matches by position (earliest appearance first)
  moduleMatches.sort((a, b) => a.position - b.position);
  
  // Return the module with the earliest keyword match, or 'home' if no matches
  return moduleMatches.length > 0 ? moduleMatches[0].module : 'home';
}