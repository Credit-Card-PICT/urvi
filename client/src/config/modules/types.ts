export type LayoutType = 'vertical' | 'timeline' | 'productGrid' | 'cardList' | 'forex';

export interface TemplateConfig {
  background: string;
  layout: LayoutType;
  accentColor: string;
  cardBackground: string;
  iconBackground: string;
  textColor: string;
  buttonColor: string;
}