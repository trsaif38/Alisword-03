
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { VideoInfo, VideoMedia } from '../types';
import { AdSlot } from './AdSlot';

interface VideoResultProps {
  video: VideoInfo;
  onReset: () => void;
  onDownloadComplete: (quality: string) => void;
  theme: 'red' | 'gold';
}

export const VideoResult: React.FC<VideoResultProps> = ({ video, onReset, onDownloadComplete, theme }) => {
  const [selectedMedia, setSelectedMedia] = useState<VideoMedia | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoPlayerRef = useRef<HTMLVideoElement>(null);

  const processedMedias = useMemo(() => {
    const vMedias = video.medias.filter(m => m.type === 'video');
    const aMedias = video.medias.filter(m => m.type === 'audio');
    
    const qualityPriority = (q: string) => {
      const low = q.toLowerCase();
      if (low.includes('1080')) return 100;
      if (low.includes('720')) return 80;
      if (low.includes('480')) return 60;
      if (low.includes('360')) return 40;
      return 0;
    };

    const sortedVideo = [...vMedias].sort((a, b) => qualityPriority(b.quality) - qualityPriority(a.quality));
    return { video: sortedVideo, audio: aMedias };
  }, [video]);

  useEffect(() => {
    if (!selectedMedia) {
      if (processedMedias.video.length > 0) {
        setSelectedMedia(processedMedias.video[0]);
      } else if (processedMedias.audio.length > 0) {
        setSelectedMedia(processedMedias.audio[0]);
      }
    }
  }, [selectedMedia, processedMedias]);

  useEffect(() => {
    if (videoPlayerRef.current) {
      videoPlayerRef.current.load();
    }
  }, [selectedMedia]);

  const triggerDirectDownload = async (media: VideoMedia) => {
    if (isDownloading) return;
    setIsDownloading(true);
    setProgress(0);
    setDownloadSuccess(false);

    try {
      // Use a proxy-like approach or hope for the best with the direct URL
      // If the direct URL fails CORS, the catch block will handle it
      const response = await fetch(media.url, { mode: 'cors' });
      if (!response.ok) throw new Error('CORS_OR_FETCH_FAILED');
      
      const contentLength = response.headers.get('content-length');
      const total = contentLength ? parseInt(contentLength, 10) : 0;
      const reader = response.body?.getReader();
      if (!reader) throw new Error('READER_FAILED');

      let receivedLength = 0;
      const chunks = [];
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        receivedLength += value.length;
        if (total > 0) {
          setProgress(Math.round((receivedLength / total) * 100));
        } else {
          setProgress(prev => (prev < 90 ? prev + 5 : prev));
        }
      }

      const blobType = media.type === 'audio' ? 'audio/mpeg' : 'video/mp4';
      const blob = new Blob(chunks, { type: blobType });
      const downloadUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = downloadUrl;
      const safeTitle = video.title.replace(/[^a-z0-9]/gi, '_').substring(0, 30);
      const extension = media.type === 'audio' ? 'mp3' : 'mp4';
      link.download = `Alisword_${safeTitle}.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      setProgress(100);
      setDownloadSuccess(true);
      onDownloadComplete(media.quality);
      setTimeout(() => { setIsDownloading(false); onReset(); }, 2000);

    } catch (err: any) {
      console.warn("Enhanced Download failed, falling back to window.open", err);
      // Fallback: This is often the most reliable for varied platform URLs
      const win = window.open(media.url, '_blank');
      if (win) {
        setDownloadSuccess(true);
        setProgress(100);
        setTimeout(() => { setIsDownloading(false); onReset(); }, 1500);
      } else {
        setIsDownloading(false);
        alert("Pop-up blocked! Please allow pop-ups to download the file.");
      }
    }
  };

  const isVideoSelected = selectedMedia?.type === 'video';
  const accentColor = theme === 'red' ? 'red-600' : 'amber-500';
  const accentShadow = theme === 'red' ? 'rgba(220,38,38,0.15)' : 'rgba(245,158,11,0.2)';
  const portalHeading = theme === 'red' ? 'text-red-600' : 'text-amber-500';
  const closeBtn = theme === 'red' ? 'bg-red-600/10 text-red-500 hover:bg-red-600' : 'bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-black';
  const mainBtn = theme === 'red' ? 'bg-red-600 hover:bg-red-700 shadow-xl' : 'bg-amber-500 hover:bg-amber-600 shadow-xl text-black';

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/98 backdrop-blur-3xl animate-in fade-in duration-500">
      <div className="absolute inset-0" onClick={() => !isDownloading && onReset()}></div>

      <div className={`relative w-full max-w-xl bg-[#050505] rounded-t-[3.5rem] p-6 pb-12 shadow-[0_-40px_100px_${accentShadow}] border-t border-${accentColor}/30 max-h-[98vh] overflow-y-auto scrollbar-hide`}>
        <div className="w-12 h-1 bg-white/10 rounded-full mx-auto mb-6"></div>
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <h3 className="text-white font-black italic uppercase text-xl tracking-[0.1em] font-grotesk">Ready to <span className={portalHeading}>Download</span></h3>
            <p className="text-slate-600 text-[8px] font-black uppercase tracking-[0.4em] mt-1 opacity-60">{video.platform} Node: Live</p>
          </div>
          <button onClick={onReset} className={`w-11 h-11 flex items-center justify-center ${closeBtn} hover:text-white rounded-2xl transition-all active:scale-90`} disabled={isDownloading}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="relative w-full aspect-video bg-black rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl mb-8">
          {isVideoSelected ? (
            <video 
              ref={videoPlayerRef}
              className="w-full h-full object-contain"
              controls
              poster={video.thumbnail}
              playsInline
            >
              <source src={selectedMedia.url} type="video/mp4" />
            </video>
          ) : (
            <div className="w-full h-full relative flex flex-col items-center justify-center">
              <img src={video.thumbnail} className="absolute inset-0 w-full h-full object-cover blur-md opacity-30" alt="" />
              <div className={`w-16 h-16 bg-white/5 rounded-full flex items-center justify-center border border-${accentColor}/20 relative z-10`}>
                <svg className={`w-8 h-8 text-${accentColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"/></svg>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex gap-4 mb-8 bg-white/[0.02] p-4 rounded-[2rem] border border-white/5 items-center">
          <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-white/5">
            <img src={video.thumbnail} className="w-full h-full object-cover" alt="" />
          </div>
          <div className="flex-grow min-w-0">
            <h4 className="text-white font-black text-xs line-clamp-1 uppercase italic tracking-tight">{video.title}</h4>
            <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mt-1">{selectedMedia?.quality}</p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <p className="text-slate-700 text-[9px] font-black uppercase tracking-[0.5em] px-2">Select Format</p>
          <div className="grid grid-cols-1 gap-2">
            {processedMedias.video.slice(0, 3).map((m, idx) => (
              <button 
                key={idx}
                onClick={() => !isDownloading && setSelectedMedia(m)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${selectedMedia?.url === m.url && selectedMedia?.type === 'video' ? `bg-${accentColor} text-${theme === 'red' ? 'white' : 'black'}` : 'bg-white/5 border border-white/5'}`}
              >
                <span className="font-black text-[10px] italic uppercase tracking-widest">{m.quality}</span>
                <span className="text-[9px] font-bold opacity-60">MP4</span>
              </button>
            ))}
            {processedMedias.audio.length > 0 && (
              <button 
                onClick={() => !isDownloading && setSelectedMedia({...processedMedias.audio[0], type: 'audio', quality: 'High Fidelity Audio'})}
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${selectedMedia?.type === 'audio' ? 'bg-white text-black' : 'bg-white/5 border border-white/5'}`}
              >
                <span className="font-black text-[10px] italic uppercase tracking-widest">Audio MP3</span>
                <span className="text-[9px] font-bold opacity-60">320kbps</span>
              </button>
            )}
          </div>
        </div>

        <div className="mt-auto">
          {isDownloading && (
            <div className="mb-6 px-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[9px] font-black text-white uppercase tracking-widest italic">Node Syncing...</span>
                <span className={`text-[10px] font-black text-${accentColor}`}>{progress}%</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full bg-${accentColor} transition-all duration-300`} style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          )}

          <button 
            onClick={() => selectedMedia && triggerDirectDownload(selectedMedia)}
            disabled={isDownloading && !downloadSuccess}
            className={`w-full ${mainBtn} py-6 rounded-[2rem] font-black uppercase text-[12px] tracking-[0.5em] transition-all flex items-center justify-center gap-4 italic active:scale-95`}
          >
            {isDownloading && !downloadSuccess ? (
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            ) : downloadSuccess ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
                <span>Done</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                <span>Download</span>
              </>
            )}
          </button>
        </div>
        
        <div className="mt-8">
          <AdSlot slot="9803684156" className="w-full h-[100px]" />
        </div>
      </div>
    </div>
  );
};
