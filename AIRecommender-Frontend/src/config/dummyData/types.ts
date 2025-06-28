export interface ResponseItem {
  id: number;
  type: 'text' | 'image' | 'card' | 'product';
  content: string;
  src?: string;
  alt?: string;
  price?: string;
  rating?: number;
  location?: string;
  discount?: string;
  features?: string[];
}