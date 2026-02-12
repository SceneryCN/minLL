// 歌曲类型
export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  cover: string;
  description?: string;
  learnedDate?: string;
  progress?: number;
  status: 'learned' | 'learning' | 'planned';
}

// 笔记类型
export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  tags: string[];
  cover?: string;
}

// 歌手类型
export interface Artist {
  id: string;
  name: string;
  avatar: string;
  description: string;
}

// 导航项类型
export interface NavItem {
  path: string;
  label: string;
  icon: string;
}

// 社交媒体类型
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

// 消息类型（用于LLM）
export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

// 页面配置类型
export interface PageConfig {
  title: string;
  description: string;
}
