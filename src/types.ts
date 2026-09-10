export type TraditionType = 'buddhism' | 'taoism' | 'christianity' | 'stoicism' | 'universal';

export interface TraditionInfo {
  id: TraditionType;
  name: string;
  enName: string;
  symbol: string;
  description: string;
  corePhilosophy: string;
  avatarIcon: string;
  primaryColor: string;
  textColor: string;
  accentBg: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: string;
  tradition?: TraditionType;
  scriptureCitation?: {
    source: string;
    verse: string;
  };
  suggestedPractice?: string;
  source?: 'gemini-3.8-flash' | 'canonical-engine';
}

export interface DailyScripture {
  tradition: TraditionType;
  quote: string;
  source: string;
  chapter?: string;
  originalText?: string;
  insight: string;
  action: string;
  date: string;
}

export interface CompetitorApp {
  id: string;
  name: string;
  category: 'Christian' | 'Islamic' | 'Buddhist/Eastern' | 'Secular/Mindfulness' | 'Experimental AI';
  userScale: string;
  coreFeatures: string[];
  pros: string[];
  cons: string[];
  aiLevel: '无AI' | '基础规则/弱AI' | '单向生成/浅层' | '深度共情/生态化';
  monetization: string;
  rating: number;
}

export interface UserPersona {
  id: string;
  name: string;
  role: string;
  age: string;
  scenario: string;
  painPoints: string[];
  jtbd: string; // Jobs to be done
  emotionalTriggers: string[];
}

export interface PrdSection {
  id: string;
  title: string;
  badge?: string;
  summary: string;
  content: string;
  subsections?: {
    subtitle: string;
    body: string;
    tags?: string[];
  }[];
}
