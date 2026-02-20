
import React from 'react';

interface HomeGridProps {
  theme: 'red' | 'gold';
  onPlatformClick: (platform: string) => void;
}

export const HomeGrid: React.FC<HomeGridProps> = ({ theme, onPlatformClick }) => {
  const platforms = [
    { name: 'TikTok', color: 'bg-[#000000] text-white border-white/10', icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.33-.85.51-1.44 1.43-1.58 2.41-.14.99.13 2.02.74 2.8.65.82 1.65 1.33 2.67 1.41 1.07.1 2.19-.21 3-.9.91-.75 1.43-1.88 1.44-3.05.02-4.44.02-8.88.02-13.32z"/></svg>
    )},
    { name: 'YouTube', color: 'bg-[#FF0000] text-white', icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
    )},
    { name: 'Instagram', color: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white', icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0z"/></svg>
    )},
    { name: 'Facebook', color: 'bg-[#1877F2] text-white', icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
    )},
    { name: 'X / Twitter', color: 'bg-[#000000] text-white border border-white/20', icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    )},
    { name: 'Snapchat', color: 'bg-[#FFFC00] text-black', icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"/></svg>
    )},
    { name: 'Pinterest', color: 'bg-[#E60023] text-white', icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162z"/></svg>
    )},
    { name: 'Reddit', color: 'bg-[#FF4500] text-white', icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0z"/></svg>
    )}
  ];

  const labelHover = theme === 'red' ? 'group-hover:text-red-500' : 'group-hover:text-amber-500';

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-4 md:gap-8">
        {platforms.map((p, idx) => (
          <div
            key={idx}
            onClick={() => onPlatformClick(p.name)}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className={`w-14 h-14 md:w-16 md:h-16 ${p.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-active:scale-95 transition-all duration-700 relative overflow-hidden`}>
              {p.icon}
            </div>
            <span className={`mt-4 text-[9px] font-black text-slate-700 uppercase tracking-widest ${labelHover} transition-colors`}>
              {p.name}
            </span>
          </div>
        ))}
      </div>
      
      <div className="mt-12 flex flex-wrap justify-center gap-8 opacity-10 grayscale">
          <span className="text-[9px] font-black uppercase tracking-widest text-white">Vimeo</span>
          <span className="text-[9px] font-black uppercase tracking-widest text-white">LinkedIn</span>
          <span className="text-[9px] font-black uppercase tracking-widest text-white">DailyMotion</span>
          <span className="text-[9px] font-black uppercase tracking-widest text-white">Cloudflare Node</span>
      </div>
    </div>
  );
};
