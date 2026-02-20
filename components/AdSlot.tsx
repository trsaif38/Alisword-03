
import React, { useEffect, useRef, useState } from 'react';

interface AdSlotProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const AdSlot: React.FC<AdSlotProps> = ({ slot, format = 'auto', className = '' }) => {
  const adInjected = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');

  useEffect(() => {
    // Reset the ref on unmount or slot change
    adInjected.current = false;
    
    const initializeAd = () => {
      if (adInjected.current) return;

      try {
        if (typeof window !== 'undefined' && window.adsbygoogle) {
          // Ensure the 'ins' tag is empty before pushing to prevent "double push" errors
          const insElement = containerRef.current?.querySelector('ins');
          if (insElement && insElement.children.length === 0) {
            setStatus('loading');
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            adInjected.current = true;
            setStatus('success');
            console.debug(`[AdSense] Slot ${slot} successfully initialized.`);
          }
        } else {
          // Script might still be loading, retry shortly
          setTimeout(initializeAd, 1000);
        }
      } catch (e) {
        console.error(`[AdSense] Error on slot ${slot}:`, e);
        setStatus('error');
      }
    };

    // Small delay to ensure the DOM has rendered the 'ins' element
    const timer = setTimeout(initializeAd, 600);

    return () => {
      clearTimeout(timer);
      adInjected.current = false;
    };
  }, [slot]);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden bg-black/20 border border-white/5 rounded-[2.5rem] flex items-center justify-center min-h-[100px] w-full transition-all duration-700 ${className}`}
    >
      {/* Structural Label for UI consistency */}
      <div className="absolute top-3 left-6 text-[7px] font-black uppercase tracking-[0.5em] text-slate-800 z-0 select-none opacity-40">
        AD_NODE_SECURE::{slot}
      </div>

      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', minHeight: '100px', textAlign: 'center' }}
        data-ad-client="ca-pub-5507150452428190"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      ></ins>

      {/* Modern Visual Feedback when loading/empty */}
      {status !== 'success' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505]/60 backdrop-blur-sm -z-10">
          <div className="w-5 h-5 border-2 border-white/5 border-t-white/20 rounded-full animate-spin mb-2"></div>
          <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-700">Syncing Media Node...</span>
        </div>
      )}
      
      {/* Decorative corners to match Alisword aesthetic */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/10 rounded-tl-2xl"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/10 rounded-br-2xl"></div>
    </div>
  );
};
