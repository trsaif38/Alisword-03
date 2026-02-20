
import React from 'react';
import { DownloadHistoryItem } from '../types';

interface HistoryProps {
  history: DownloadHistoryItem[];
  onClear: () => void;
  onClose: () => void;
}

export const History: React.FC<HistoryProps> = ({ history, onClear, onClose }) => {
  const formatTime = (ts: number) => {
    const diff = Date.now() - ts;
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return new Date(ts).toLocaleDateString();
  };

  // Safe sort: copy first, then sort to avoid mutating props/state
  const sortedHistory = [...history].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Your History</h2>
          <p className="text-slate-400 text-sm mt-1">Recently processed and downloaded videos.</p>
        </div>
        <div className="flex space-x-3">
          {history.length > 0 && (
            <button 
              onClick={onClear}
              className="text-xs font-bold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all uppercase tracking-widest px-4 py-2.5 rounded-xl border border-red-500/20"
            >
              Clear All
            </button>
          )}
          <button 
            onClick={onClose}
            className="bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all p-2.5 rounded-xl border border-slate-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="bg-slate-900/50 border border-slate-800 rounded-[2rem] p-16 text-center border-dashed">
          <div className="w-20 h-20 bg-slate-800/50 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-300 mb-2">History is empty</h3>
          <p className="text-slate-500 max-w-xs mx-auto text-sm">Start downloading videos to see them appear here in your local gallery.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {sortedHistory.map((item) => (
            <div 
              key={item.id}
              className="bg-slate-900/60 backdrop-blur-md border border-slate-800/50 p-5 rounded-2xl flex items-center space-x-5 hover:border-blue-500/30 hover:bg-slate-800/40 transition-all group"
            >
              <div className="relative w-24 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-slate-700/50 shadow-lg">
                <img src={item.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{item.platform}</span>
                  <span className="text-slate-700">•</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase">{formatTime(item.timestamp)}</span>
                </div>
                <h4 className="text-white font-bold text-base truncate pr-8">{item.title}</h4>
                <div className="flex items-center space-x-3 mt-1">
                   <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-md font-bold uppercase tracking-tighter border border-blue-500/10">{item.quality}</span>
                   <span className="text-[10px] text-slate-600 font-bold uppercase">Format: MP4</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-800/50 text-slate-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-xl transition-all border border-slate-700/50"
                  title="Original Link"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.826L10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
