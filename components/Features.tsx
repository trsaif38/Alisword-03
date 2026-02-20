
import React from 'react';

interface FeaturesProps {
  theme: 'red' | 'gold';
}

export const Features: React.FC<FeaturesProps> = ({ theme }) => {
  const iconBg = theme === 'red' ? 'bg-red-600/10 text-red-600 border-red-600/10 group-hover:bg-red-600' : 'bg-amber-500/10 text-amber-500 border-amber-500/10 group-hover:bg-amber-500 group-hover:text-black';
  const accentText = theme === 'red' ? 'group-hover:text-red-500' : 'group-hover:text-amber-500';
  const cardBorder = theme === 'red' ? 'hover:border-red-600/20' : 'hover:border-amber-500/20';

  const features = [
    {
      title: 'Neural Link',
      desc: 'Deep-link analysis to bypass platform restrictions and extract source files instantly.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: 'Lossless 4K',
      desc: 'Preserve original fidelity without bit-rate degradation or added compression.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18" />
        </svg>
      )
    },
    {
      title: 'No Watermark',
      desc: 'Automatic signature removal clears all social logos for a clean viewing experience.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6" />
        </svg>
      )
    },
    {
      title: 'Multi-Platform',
      desc: 'Full support for TikTok, Instagram Reels, X (Twitter), YouTube, and 20+ other platforms.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((f, i) => (
        <div key={i} className={`blur-card p-8 rounded-[2rem] ${cardBorder} transition-all duration-700 group`}>
          <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center mb-6 border transition-all duration-500`}>
            {f.icon}
          </div>
          <h3 className={`text-xs font-black uppercase italic tracking-[0.2em] mb-3 text-white/90 ${accentText} transition-colors`}>{f.title}</h3>
          <p className="text-slate-600 text-[11px] font-medium leading-relaxed opacity-70">
            {f.desc}
          </p>
        </div>
      ))}
    </div>
  );
};
