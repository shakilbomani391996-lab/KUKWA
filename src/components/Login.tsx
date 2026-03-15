import React from 'react';
import { Phone, Mail, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

export const Login = ({ onLogin }: { onLogin: () => void }) => {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-8 space-y-12">
      <div className="text-center space-y-4">
        <Logo size="xl" />
        <p className="text-stone-500 font-medium tracking-wide uppercase text-xs">Kutoka Kwangu Kuja Kwako</p>
      </div>

      <div className="w-full space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-stone-800">Karibu Tena</h2>
          <p className="text-sm text-stone-500">Ingia ili kuendelea na safari yako ya KUKWA.</p>
        </div>

        <div className="space-y-3">
          <button 
            onClick={onLogin}
            className="w-full flex items-center justify-between p-4 bg-white border border-stone-200 rounded-2xl hover:bg-stone-50 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center">
                <Phone size={20} />
              </div>
              <span className="font-bold text-stone-800">Namba ya Simu</span>
            </div>
            <ArrowRight size={20} className="text-stone-300 group-hover:text-orange-600 transition-colors" />
          </button>

          <button 
            onClick={onLogin}
            className="w-full flex items-center justify-between p-4 bg-white border border-stone-200 rounded-2xl hover:bg-stone-50 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-stone-50 text-stone-600 flex items-center justify-center">
                <Mail size={20} />
              </div>
              <span className="font-bold text-stone-800">Barua Pepe (Email)</span>
            </div>
            <ArrowRight size={20} className="text-stone-300 group-hover:text-stone-600 transition-colors" />
          </button>
        </div>

        <div className="pt-8 text-center">
          <p className="text-xs text-stone-400">
            Kwa kuendelea, unakubaliana na <span className="text-stone-800 font-bold underline">Vigezo na Masharti</span> yetu.
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 text-center opacity-20 pointer-events-none">
        <div className="flex gap-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="w-8 h-8 rounded-full bg-orange-600" />
          ))}
        </div>
      </div>
    </div>
  );
};
