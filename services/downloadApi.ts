
import { VideoInfo, VideoMedia } from "../types";
import { analyzeLinkWithGemini } from "./geminiService";

const RAPID_API_KEY = "c4f327a949msh51adb06b2427129p147921jsn33b686fef374"; 

const formatQuality = (q: string): string => {
  if (!q) return "720p HD";
  const low = q.toLowerCase();
  if (low.includes('1080')) return "1080p Full HD";
  if (low.includes('720')) return "720p HD";
  if (low.includes('480')) return "480p SD";
  if (low.includes('360')) return "360p Low Quality";
  if (low.includes('audio')) return "High Quality Audio";
  
  return q.split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const extractMedias = (data: any): VideoMedia[] => {
  const medias: VideoMedia[] = [];
  const seenUrls = new Set<string>();

  // Priority 1: Use the explicit 'medias' array if it exists
  if (data && Array.isArray(data.medias)) {
    data.medias.forEach((m: any) => {
      if (m.url && !seenUrls.has(m.url)) {
        seenUrls.add(m.url);
        
        // Strictly determine type based on quality name or explicit type
        let type = m.type || 'video';
        const lowQuality = m.quality?.toLowerCase() || '';
        const lowUrl = m.url.toLowerCase();
        
        // Improved type detection
        if (lowUrl.includes('.mp3') || lowUrl.includes('.m4a') || (lowQuality.includes('audio') && !lowQuality.includes('video') && !lowQuality.includes('hd'))) {
          type = 'audio';
        } else if (lowUrl.includes('.mp4') || lowUrl.includes('.mov') || lowUrl.includes('.webm') || lowQuality.includes('video') || lowQuality.includes('hd') || lowQuality.includes('watermark') || lowQuality.includes('1080') || lowQuality.includes('720')) {
          type = 'video';
        }

        medias.push({
          url: m.url,
          quality: formatQuality(m.quality),
          type: type
        });
      }
    });
    return medias;
  }

  // Priority 2: Deep traversal for fallback
  const traverse = (item: any, keyName: string = '') => {
    if (!item) return;
    if (typeof item === 'string' && (item.startsWith('http') || item.startsWith('//'))) {
      let urlStr = item.startsWith('//') ? 'https:' + item : item;
      if (!seenUrls.has(urlStr)) {
        const lowUrl = urlStr.toLowerCase();
        const lowKey = keyName.toLowerCase();
        
        const isAudio = (lowKey.includes('audio') || lowUrl.includes('.mp3') || lowUrl.includes('m4a')) && !lowUrl.includes('.mp4') && !lowKey.includes('video');
        const isVideo = lowUrl.includes('.mp4') || lowUrl.includes('video') || lowUrl.includes('.mov') || lowUrl.includes('.webm') || lowUrl.includes('googlevideo') || lowKey.includes('video') || lowKey.includes('hd');

        if (isAudio || isVideo) {
          seenUrls.add(urlStr);
          medias.push({
            url: urlStr,
            quality: isAudio ? "320kbps Audio" : "720p HD",
            type: isAudio ? 'audio' : 'video'
          });
        }
      }
    } else if (Array.isArray(item)) {
      item.forEach(i => traverse(i));
    } else if (typeof item === 'object') {
      Object.entries(item).forEach(([k, v]) => traverse(v, k));
    }
  };

  traverse(data);
  
  // Enhance labels if the API results are generic
  return medias.map((m, idx) => {
    if (m.type === 'video' && m.quality === '720p HD') {
       const labels = ["1080p Full HD", "720p HD", "480p SD", "360p Low Quality"];
       return { ...m, quality: labels[idx] || "720p HD" };
    }
    return m;
  });
};

export const fetchVideoDetails = async (url: string): Promise<VideoInfo> => {
  const cleanUrl = url.trim();
  const mainHost = 'social-download-all-in-one.p.rapidapi.com';
  const mainEndpoint = `https://${mainHost}/v1/social/autolink`;

  try {
    const response = await fetch(mainEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-key': RAPID_API_KEY,
        'x-rapidapi-host': mainHost
      },
      body: JSON.stringify({ url: cleanUrl })
    });

    if (response.ok) {
      const data = await response.json();
      const medias = extractMedias(data);
      
      if (medias.length > 0) {
        return {
          title: data.title || "Alisword Social Video",
          platform: detectPlatform(cleanUrl),
          thumbnail: data.thumbnail || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800",
          duration: data.duration ? `${data.duration}s` : "HD",
          originalUrl: cleanUrl,
          medias: medias
        };
      }
    }
  } catch (e) {
    console.error("API Fetch Error:", e);
  }

  // Fallback to Gemini if API fails or returns no media
  return await analyzeLinkWithGemini(cleanUrl);
};

const detectPlatform = (url: string): string => {
  const lowUrl = url.toLowerCase();
  if (lowUrl.includes('tiktok')) return 'TIKTOK';
  if (lowUrl.includes('instagram')) return 'INSTAGRAM';
  if (lowUrl.includes('facebook') || lowUrl.includes('fb.')) return 'FACEBOOK';
  if (lowUrl.includes('youtube') || lowUrl.includes('youtu.be')) return 'YOUTUBE';
  if (lowUrl.includes('twitter') || lowUrl.includes('x.com')) return 'X / TWITTER';
  if (lowUrl.includes('pinterest')) return 'PINTEREST';
  if (lowUrl.includes('reddit')) return 'REDDIT';
  if (lowUrl.includes('snapchat')) return 'SNAPCHAT';
  if (lowUrl.includes('vimeo')) return 'VIMEO';
  if (lowUrl.includes('linkedin')) return 'LINKEDIN';
  return 'SOCIAL VIDEO';
};
