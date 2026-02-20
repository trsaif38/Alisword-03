
import React from 'react';

interface HeaderProps {
  onHome: () => void;
  theme: 'red' | 'gold';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onHome, theme, onToggleTheme }) => {
  const accentBg = theme === 'red' ? 'bg-red-600 shadow-red-600/20' : 'bg-amber-500 shadow-amber-500/20';
  const accentText = theme === 'red' ? 'group-hover:text-red-500' : 'group-hover:text-amber-500';
  const logoAccent = theme === 'red' ? 'text-red-600' : 'text-amber-500';
  const premiumBtn = theme === 'red' ? 'bg-red-600 hover:bg-red-700 shadow-red-600/10' : 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/20 text-black';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-2xl border-b border-white/5 transition-colors duration-1000">
      <div className="w-full px-6 md:px-12 h-24 flex items-center justify-between">
        <button onClick={onHome} className="flex items-center gap-4 group">
          <div className={`w-12 h-12 ${accentBg} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500`}>
            <svg className={`w-7 h-7 ${theme === 'red' ? 'text-white' : 'text-black'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </div>
          <div className="flex flex-col items-start leading-none">
            <span className={`text-2xl font-[950] tracking-tighter italic text-white uppercase ${accentText} transition-colors`}>Alisword<span className={logoAccent}>Pro</span></span>
            <span className="text-[8px] font-black uppercase tracking-[0.5em] text-slate-500 mt-1 opacity-60">Elite Extraction</span>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-10">
          {['API', 'STATUS', 'SUPPORT'].map((link) => (
            <a key={link} href="#" className={`text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ${theme === 'red' ? 'hover:text-red-600' : 'hover:text-amber-500'} transition-colors`}>{link}</a>
          ))}
          <div className="h-6 w-px bg-white/10 mx-2"></div>
          <button 
            onClick={onToggleTheme}
            className={`px-8 py-2.5 rounded-full ${premiumBtn} text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-95 shadow-lg font-grotesk`}
          >
            Premium
          </button>
        </nav>
      </div>
    </header>
  );
};
