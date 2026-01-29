export interface ResizedImage {
  platform: 'twitch' | 'discord';
  size: number;
  dataUrl: string;
  blob: Blob;
}

export interface ProcessingState {
  isResizing: boolean;
}

export interface AIAnalysisResult {
  name: string;
  description: string;
  tags: string[];
}

export interface PlatformSize {
  platform: 'twitch' | 'discord';
  size: number;
}