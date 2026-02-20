
export interface VideoMedia {
  url: string;
  quality: string;
  type: string;
}

export interface VideoInfo {
  title: string;
  platform: string;
  thumbnail: string;
  duration: string;
  originalUrl: string;
  medias: VideoMedia[]; // API থেকে প্রাপ্ত সব ভিডিও লিঙ্ক
}

export interface DownloadHistoryItem {
  id: string;
  title: string;
  url: string;
  platform: string;
  quality: string;
  thumbnail: string;
  timestamp: number;
}

export enum AppStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
