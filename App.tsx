
import React, { useState, useCallback, useRef } from 'react';
import { Header } from './components/Header';
import { Downloader } from './components/Downloader';
import { HomeGrid } from './components/HomeGrid';
import { Features } from './components/Features';
import { Footer } from './components/Footer';
import { VideoResult } from './components/VideoResult';
import { AdSlot } from './components/AdSlot';
import { fetchVideoDetails } from './services/downloadApi';
import { AppStatus, VideoInfo } from './types';

const App: React.FC = () => {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [videoData, setVideoData] = useState<VideoInfo | null>(null);
  const [error, setError] = useState('');
  const [theme, setTheme] = useState<'red' | 'gold'>('red');
  const [showAdModal, setShowAdModal] = useState(false);
  
  const lastProcessedUrl = useRef<string>('');

  const toggleTheme = () => {
    setTheme(prev => prev === 'red' ? 'gold' : 'red');
  };

  const handleProcessLink = useCallback(async (targetUrl: string) => {
    if (!targetUrl.trim() || status === AppStatus.LOADING) return;
    
    setStatus(AppStatus.LOADING);
    setError('');
    try {
      const result = await fetchVideoDetails(targetUrl);
      setVideoData(result);
      setStatus(AppStatus.SUCCESS);
      lastProcessedUrl.current = targetUrl;
    } catch (err: any) {
      console.error(err);
      setError("Extraction Node Busy: Please try again with a valid link.");
      setStatus(AppStatus.IDLE);
    }
  }, [status]);

  const handleManualProcess = () => {
    if (!url.trim()) {
      setError("Please paste a valid video link first.");
      return;
    }
    handleProcessLink(url);
  };

  const onPlatformClick = () => {
    setShowAdModal(true);
  };

  // Theme-based style strings
  const accentText = theme === 'red' ? 'text-red-600' : 'text-amber-500';
  const glowClass = theme === 'red' ? 'text-glow-red' : 'text-glow-gold';
  const bgGlow = theme === 'red' ? 'bg-red-600/[0.03]' : 'bg-amber-500/[0.03]';
  const borderClass = theme === 'red' ? 'hover:border-red-600/20' : 'hover:border-amber-500/20';
  const adModalAccent = theme === 'red' ? 'border-red-600/20 shadow-red-600/10' : 'border-amber-500/20 shadow-amber-500/10';

  return (
    <div className={`min-h-screen flex flex-col selection:bg-${theme === 'red' ? 'red' : 'amber'}-600 selection:text-white bg-[#000000] transition-colors duration-1000`}>
      <div className={`fixed top-0 left-1/4 w-[600px] h-[600px] ${bgGlow} rounded-full blur-[180px] pointer-events-none transition-colors duration-1000`}></div>
      
      <Header theme={theme} onToggleTheme={toggleTheme} onHome={() => { setVideoData(null); setStatus(AppStatus.IDLE); lastProcessedUrl.current = ''; }} />
      
      <main className="flex-grow pt-40 pb-24 px-6">
        <div className="max-w-5xl mx-auto space-y-20">
          
          <section className="text-center space-y-8">
            <div className={`inline-flex items-center gap-3 px-4 py-1.5 rounded-full ${theme === 'red' ? 'bg-red-600/5 border-red-600/10 text-red-500' : 'bg-amber-500/5 border-amber-500/10 text-amber-500'} border mb-2`}>
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${theme === 'red' ? 'bg-red-500' : 'bg-amber-400'} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${theme === 'red' ? 'bg-red-600' : 'bg-amber-500'}`}></span>
              </span>
              <span className="text-[9px] font-black uppercase tracking-[0.4em] font-grotesk">Global Node Active</span>
            </div>
            
            <h1 className={`text-4xl md:text-6xl font-[1000] italic uppercase tracking-[0.02em] text-white leading-none ${glowClass} font-grotesk`}>
              Alisword <span className={accentText}>HD Video Downloader</span>
            </h1>

            <div className="max-w-3xl mx-auto pt-4 space-y-12">
              <Downloader 
                url={url} 
                setUrl={setUrl} 
                onProcess={handleManualProcess} 
                status={status} 
                error={error} 
                theme={theme}
              />
              
              <div className="space-y-6">
                <p className="text-[8px] font-black uppercase tracking-[0.5em] text-slate-700">Select Platform to Sync</p>
                <HomeGrid theme={theme} onPlatformClick={onPlatformClick} />
              </div>

              <AdSlot slot="9803684156" className="w-full h-[120px] shadow-2xl" />
            </div>
          </section>

          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Extraction", value: "Neural", sub: "Speed" },
              { label: "Resolution", value: "4K Native", sub: "Limit" },
              { label: "Protocol", value: "HTTPS-V3", sub: "Security" },
              { label: "Quality", value: "Lossless", sub: "Master" }
            ].map((stat, i) => (
              <div key={i} className={`blur-card p-8 rounded-[2.5rem] text-center border border-white/[0.03] ${borderClass} transition-all duration-700`}>
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-700 mb-3">{stat.label}</p>
                <h4 className="text-xl font-[1000] text-white italic font-grotesk">{stat.value}</h4>
              </div>
            ))}
          </section>

          <AdSlot slot="9803684156" format="rectangle" className="w-full h-[280px]" />

          <Features theme={theme} />
        </div>
      </main>

      {/* Interstitial Ad Modal */}
      {showAdModal && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-6 animate-in fade-in duration-500">
          <div className={`relative w-full max-w-2xl bg-[#080808] rounded-[3rem] p-8 border ${adModalAccent} transition-all duration-500`}>
             <button 
               onClick={() => setShowAdModal(false)}
               className={`absolute -top-4 -right-4 w-12 h-12 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center border border-white/10 text-white transition-all active:scale-90 z-10`}
             >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/></svg>
             </button>

             <div className="text-center mb-8">
                <span className={`text-[8px] font-black uppercase tracking-[0.5em] text-${theme === 'red' ? 'red-500' : 'amber-500'} mb-2 block`}>Partner Presentation</span>
                <h2 className="text-white text-xl font-black italic uppercase tracking-widest font-grotesk">Portal Sync Sponsored Content</h2>
             </div>

             <div className="min-h-[300px] flex items-center justify-center bg-black/40 rounded-[2rem] border border-white/5 overflow-hidden">
                <AdSlot slot="9803684156" format="rectangle" className="w-full h-full" />
             </div>

             <div className="mt-8 flex justify-center">
                <button 
                  onClick={() => setShowAdModal(false)}
                  className={`px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.3em] italic transition-all ${theme === 'red' ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-amber-500 hover:bg-amber-600 text-black'}`}
                >
                  Continue to App
                </button>
             </div>
          </div>
        </div>
      )}

      {status === AppStatus.SUCCESS && videoData && (
        <VideoResult 
          video={videoData} 
          theme={theme}
          onReset={() => { setStatus(AppStatus.IDLE); setVideoData(null); lastProcessedUrl.current = ''; }} 
          onDownloadComplete={() => {}} 
        />
      )}

      <Footer theme={theme} />
    </div>
  );
};

export default App;
