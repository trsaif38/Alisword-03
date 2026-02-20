
import React, { useState } from 'react';

interface BrowserViewProps {
  url: string;
  onDownloadTrigger: () => void;
  isLoading: boolean;
}

export const BrowserView: React.FC<BrowserViewProps> = ({ url, onDownloadTrigger, isLoading }) => {
  const domain = new URL(url).hostname.replace('www.', '');

  return (
    <div className="relative h-[75vh] w-full rounded-[3rem] overflow-hidden border border-white/5 bg-[#080808] shadow-2xl animate-in fade-in zoom-in-95 duration-500">
      {/* Premium Browser Header */}
      <div className="bg-[#121212] p-4 flex items-center gap-4 border-b border-white/5">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
        </div>
        <div className="flex-grow bg-black/50 rounded-2xl px-5 py-2 text-[11px] text-yellow-400/80 font-black italic tracking-wider truncate border border-white/5">
          {url}
        </div>
        <button 
          onClick={() => window.open(url, '_blank')}
          className="bg-white/5 hover:bg-white/10 p-2.5 rounded-xl transition-colors text-slate-400"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
        </button>
      </div>

      {/* Viewport with Fallback UI */}
      <div className="w-full h-full relative group">
        <iframe 
          src={url} 
          className="w-full h-full border-none bg-black"
          title="Alisword Portal"
          sandbox="allow-scripts allow-same-origin allow-popups"
        />
        
        {/* Anti-Iframe Overlay / Guide */}
        <div className="absolute inset-0 bg-[#050505] flex flex-col items-center justify-center p-10 text-center pointer-events-auto">
          <div className="w-24 h-24 bg-yellow-400/5 rounded-[2rem] flex items-center justify-center mb-8 border border-yellow-400/10 shadow-[0_0_50px_rgba(250,204,21,0.05)]">
            <svg className="w-10 h-10 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9-3-9m-9 9h18"/>
            </svg>
          </div>
          
          <h2 className="text-white font-black italic uppercase text-xl mb-4 tracking-tighter">Portal Interface</h2>
          <p className="text-slate-500 text-[11px] font-bold uppercase leading-relaxed max-w-xs mb-10 tracking-widest">
            {domain} has strict security. For the best experience, open the official site, copy the video link, and return here.
          </p>
          
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <button 
              onClick={() => window.open(url, '_blank')}
              className="w-full py-5 bg-yellow-400 text-black rounded-full font-black uppercase text-xs tracking-widest shadow-xl shadow-yellow-400/10 hover:bg-yellow-500 transition-all active:scale-95"
            >
              Open Official Site
            </button>
            <p className="text-[9px] text-slate-700 font-black uppercase tracking-[0.3em]">Copy Link & Return to Download</p>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={onDownloadTrigger}
        disabled={isLoading}
        className="absolute bottom-10 right-10 w-20 h-20 bg-yellow-400 rounded-[2rem] flex items-center justify-center shadow-[0_15px_40px_rgba(250,204,21,0.2)] hover:scale-110 active:scale-90 transition-all z-50 group overflow-hidden border-2 border-white/10"
      >
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
        {isLoading ? (
          <div className="w-8 h-8 border-4 border-black/20 border-t-black rounded-full animate-spin"></div>
        ) : (
          <svg className="w-10 h-10 text-black animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        )}
      </button>
      
      {isLoading && (
        <div className="absolute inset-0 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center z-[60] animate-in fade-in duration-300">
          <div className="relative w-32 h-32 mb-10">
            <div className="absolute inset-0 border-[6px] border-yellow-400/10 rounded-full"></div>
            <div className="absolute inset-0 border-[6px] border-yellow-400 rounded-full border-t-transparent animate-spin"></div>
            <div className="absolute inset-4 bg-yellow-400/5 rounded-full blur-xl animate-pulse"></div>
          </div>
          <h3 className="text-white font-black italic uppercase tracking-[0.5em] text-lg">ALISWORD PRO</h3>
          <p className="text-slate-600 text-[10px] font-black uppercase mt-4 tracking-[0.4em] opacity-50">Analyzing Media Stream...</p>
        </div>
      )}
    </div>
  );
};
