export type ModuleType = 'home' | 'travel' | 'hotel' | 'shopping' | 'forex';

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  moduleType?: ModuleType;
}
