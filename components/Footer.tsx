
import React from 'react';

interface FooterProps {
  theme: 'red' | 'gold';
}

export const Footer: React.FC<FooterProps> = ({ theme }) => {
  const accentColor = theme === 'red' ? 'red-600' : 'amber-500';

  return (
    <footer className="py-20 px-6 border-t border-white/5 bg-[#050505] transition-colors duration-1000">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <div className="flex items-center gap-4 mb-8">
           <div className={`w-10 h-10 bg-${accentColor}/10 rounded-xl flex items-center justify-center border border-${accentColor}/20`}>
              <svg className={`w-6 h-6 text-${accentColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
           </div>
           <span className="text-xl font-black italic tracking-tighter uppercase">Alisword<span className={`text-${accentColor}`}>Pro</span></span>
        </div>
        
        <div className="grid md:grid-cols-4 gap-12 w-full text-left mb-16 px-4">
           <div>
              <h5 className={`text-[11px] font-black uppercase tracking-widest text-${accentColor} mb-6`}>Service Status</h5>
              <div className="space-y-3">
                 <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div><span className="text-[9px] font-bold text-slate-500 uppercase">Extraction Engine: Online</span></div>
                 <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div><span className="text-[9px] font-bold text-slate-500 uppercase">CDN Nodes: Optimal</span></div>
                 <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-500"></div><span className="text-[9px] font-bold text-slate-500 uppercase">YT-DLP API: Limited</span></div>
              </div>
           </div>
           <div>
              <h5 className={`text-[11px] font-black uppercase tracking-widest text-${accentColor} mb-6`}>Support</h5>
              <div className="flex flex-col gap-3">
                 <a href="#" className="text-[9px] font-bold text-slate-600 hover:text-white uppercase tracking-widest">Help Center</a>
                 <a href="#" className="text-[9px] font-bold text-slate-600 hover:text-white uppercase tracking-widest">DMCA Takedown</a>
                 <a href="#" className="text-[9px] font-bold text-slate-600 hover:text-white uppercase tracking-widest">API Documentation</a>
              </div>
           </div>
           <div>
              <h5 className={`text-[11px] font-black uppercase tracking-widest text-${accentColor} mb-6`}>Legal</h5>
              <div className="flex flex-col gap-3">
                 <a href="#" className="text-[9px] font-bold text-slate-600 hover:text-white uppercase tracking-widest">Terms of Extraction</a>
                 <a href="#" className="text-[9px] font-bold text-slate-600 hover:text-white uppercase tracking-widest">Privacy Protocol</a>
                 <a href="#" className="text-[9px] font-bold text-slate-600 hover:text-white uppercase tracking-widest">Cookie Policy</a>
              </div>
           </div>
           <div>
              <h5 className={`text-[11px] font-black uppercase tracking-widest text-${accentColor} mb-6`}>Advanced</h5>
              <p className="text-[9px] font-bold text-slate-700 uppercase leading-relaxed tracking-wider">
                Alisword Enterprise is a private utility for media preservation and analysis. 
              </p>
              <button className="mt-4 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[8px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-all">
                Switch to Lite Node
              </button>
           </div>
        </div>

        <p className="text-[9px] font-black uppercase tracking-[0.6em] text-slate-800">
          ALISWORD GLOBAL <span className={`text-${theme === 'red' ? 'red-900' : 'amber-900'} mx-2`}>●</span> © 2025 ALL RIGHTS RESERVED
        </p>
      </div>
    </footer>
  );
};
