
import React from 'react';
import { AppStatus } from '../types';

interface DownloaderProps {
  url: string;
  setUrl: (url: string) => void;
  onProcess: () => void;
  status: AppStatus;
  error?: string;
  theme: 'red' | 'gold';
}

export const Downloader: React.FC<DownloaderProps> = ({ url, setUrl, onProcess, status, error, theme }) => {
  const isLoading = status === AppStatus.LOADING;

  const handleManualPaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
      }
    } catch (err) {
      console.warn('Clipboard access denied. Please paste manually using Ctrl+V or Long Press.');
    }
  };

  const handleClear = () => {
    setUrl('');
  };

  const accentColor = theme === 'red' ? 'red-600' : 'amber-500';
  const mainBtn = theme === 'red' ? 'bg-red-600 hover:bg-red-700 shadow-red-600/20' : 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/40 text-black';
  const focusBorder = theme === 'red' ? 'group-focus-within:border-red-600/20' : 'group-focus-within:border-amber-500/20';
  const focusIcon = theme === 'red' ? 'group-focus-within:text-red-600' : 'group-focus-within:text-amber-500';

  return (
    <div className="w-full space-y-5 animate-in slide-in-from-bottom-4 duration-1000 delay-200">
      <div className="relative group">
        <div className={`absolute -inset-1 bg-${accentColor} rounded-[2rem] blur-xl opacity-0 group-focus-within:opacity-5 transition duration-1000`}></div>
        <div className={`relative flex items-center bg-[#080808] rounded-[1.8rem] p-1.5 border border-white/[0.03] shadow-2xl ${focusBorder} transition-all duration-500`}>
          <div className={`pl-4 flex-shrink-0 text-slate-800 ${focusIcon} transition-colors`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.826L10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <input 
            type="text" 
            placeholder="Paste your video link here..." 
            className="bg-transparent border-none outline-none text-white w-full py-4 px-4 text-xs md:text-sm placeholder:text-slate-800 font-bold tracking-tight"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onProcess()}
            disabled={isLoading}
          />
          <div className="pr-1">
            {url ? (
              <button 
                onClick={handleClear}
                disabled={isLoading}
                className="px-6 py-3 rounded-xl bg-white/[0.03] hover:bg-red-600/10 text-[9px] font-black uppercase text-red-500/60 hover:text-red-500 transition-all tracking-[0.3em] border border-white/5 active:scale-95 flex items-center gap-2"
                title="Clear input"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/></svg>
                Clear
              </button>
            ) : (
              <button 
                onClick={handleManualPaste}
                disabled={isLoading}
                className="px-6 py-3 rounded-xl bg-white/[0.03] hover:bg-white/10 text-[9px] font-black uppercase text-slate-500 hover:text-white transition-all tracking-[0.3em] border border-white/5 active:scale-95 flex items-center gap-2"
                title="Paste from clipboard"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                Paste
              </button>
            )}
          </div>
        </div>
      </div>

      <button 
        onClick={onProcess}
        disabled={isLoading || !url.trim()}
        className={`w-full ${mainBtn} py-5 rounded-[1.8rem] transition-all duration-700 disabled:opacity-20 flex items-center justify-center gap-4 shadow-2xl active:scale-[0.98] group/main-btn overflow-hidden relative`}
      >
        <div className={`absolute inset-0 ${theme === 'red' ? 'bg-white/10' : 'bg-black/5'} opacity-0 group-hover/main-btn:opacity-100 transition-opacity`}></div>
        {isLoading ? (
          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 border-2 ${theme === 'red' ? 'border-white/20 border-t-white' : 'border-black/20 border-t-black'} rounded-full animate-spin`}></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">Extracting Media...</span>
          </div>
        ) : (
          <>
            <svg className="w-5 h-5 group-hover/main-btn:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="text-[11px] font-black uppercase tracking-[0.5em] italic">Download Now</span>
          </>
        )}
      </button>

      {error && (
        <div className="flex items-center justify-center gap-2 animate-in slide-in-from-top-2 duration-300 pt-2">
          <div className={`w-1.5 h-1.5 rounded-full ${theme === 'red' ? 'bg-red-600' : 'bg-amber-500'} animate-pulse`}></div>
          <p className={`text-[8px] font-black uppercase tracking-[0.2em] ${theme === 'red' ? 'text-red-500/80' : 'text-amber-500/80'}`}>{error}</p>
        </div>
      )}
    </div>
  );
};
