
import React from 'react';

interface PermissionModalProps {
  onAccept: () => void;
  onCancel: () => void;
  theme: 'red' | 'gold';
}

export const PermissionModal: React.FC<PermissionModalProps> = ({ onAccept, onCancel, theme }) => {
  const accentColor = theme === 'red' ? 'red-600' : 'amber-500';
  const glowShadow = theme === 'red' ? 'rgba(220,38,38,0.1)' : 'rgba(245,158,11,0.1)';
  const iconText = theme === 'red' ? 'text-red-600' : 'text-amber-500';
  const protocolBtn = theme === 'red' ? 'bg-red-600 hover:bg-red-700 shadow-red-600/10' : 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/20 text-black';

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md p-6 animate-in fade-in duration-500">
      <div className={`w-full max-w-md bg-[#080808] rounded-[2.5rem] p-10 border border-${accentColor}/20 text-center shadow-[0_0_50px_${glowShadow}] relative overflow-hidden group`}>
        <div className={`absolute -top-24 -right-24 w-48 h-48 bg-${accentColor}/10 rounded-full blur-[80px]`}></div>
        <div className={`absolute -bottom-24 -left-24 w-48 h-48 ${theme === 'red' ? 'bg-red-900/10' : 'bg-amber-900/10'} rounded-full blur-[80px]`}></div>

        <div className="relative z-10">
          <div className={`w-24 h-24 bg-${accentColor}/5 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-${accentColor}/10 shadow-[0_0_30px_rgba(220,38,38,0.05)]`}>
            <svg className={`w-10 h-10 ${iconText}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.414a4 4 0 00-5.656-5.656l-6.415 6.414a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </div>
          
          <h3 className="text-2xl font-[1000] italic uppercase tracking-[0.05em] text-white mb-4 font-grotesk">
            Smart <span className={iconText}>Link Sync</span>
          </h3>
          
          <p className="text-slate-500 text-[13px] font-medium leading-relaxed mb-10 px-4 opacity-80">
            Enable instant link detection. Alisword will automatically capture video links from your clipboard for a seamless 4K extraction experience.
          </p>
          
          <div className="space-y-4">
            <button 
              onClick={onAccept}
              className={`w-full py-5 ${protocolBtn} font-black uppercase text-[11px] tracking-[0.3em] rounded-2xl transition-all shadow-xl active:scale-[0.98] relative overflow-hidden group/btn`}
            >
              <div className={`absolute inset-0 ${theme === 'red' ? 'bg-white/10' : 'bg-black/5'} opacity-0 group-hover/btn:opacity-100 transition-opacity`}></div>
              Activate Protocol
            </button>
            
            <button 
              onClick={onCancel}
              className="w-full py-4 text-slate-700 font-black uppercase text-[9px] tracking-[0.4em] hover:text-white transition-all italic"
            >
              Manual Input Only
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
