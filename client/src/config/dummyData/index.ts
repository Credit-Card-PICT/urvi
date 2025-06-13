export * from './types';
import { travelResponses } from './travelData';
import { hotelResponses } from './hotelData';
import { shoppingResponses } from './shoppingData';
import { defaultResponses } from './defaultData';
import { forexResponses } from './forexData';

export { travelResponses, hotelResponses, shoppingResponses, defaultResponses, forexResponses };

export const getDummyResponses = (topic: string) => {
  switch (topic) {
    case 'travel':
      return travelResponses;
    case 'hotel':
      return hotelResponses;
    case 'shopping':
      return shoppingResponses;
    case 'forex':
      return forexResponses;
    default:
      return defaultResponses;
  }
};