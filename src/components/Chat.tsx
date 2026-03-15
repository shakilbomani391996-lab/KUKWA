import React from 'react';
import { Send, Image, Mic, MoreVertical, ChevronLeft } from 'lucide-react';
import { cn } from '../lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'them';
  time: string;
}

const messages: Message[] = [
  { id: '1', text: 'Habari! Je, hii kanzu bado ipo?', sender: 'them', time: '10:30 AM' },
  { id: '2', text: 'Ndiyo ipo! Unahitaji saizi gani?', sender: 'me', time: '10:32 AM' },
  { id: '3', text: 'Nahisi saizi L itanitosha. Unaweza kuituma leo?', sender: 'them', time: '10:35 AM' },
  { id: '4', text: 'Ndiyo, naweza kuituma kupitia KUKWA Delivery.', sender: 'me', time: '10:36 AM' },
];

export const Chat = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Header */}
      <div className="px-4 py-3 border-b border-stone-100 flex items-center gap-3 sticky top-0 bg-white z-10">
        <button onClick={onBack} className="p-1 text-stone-500">
          <ChevronLeft size={24} />
        </button>
        <div className="w-10 h-10 rounded-full bg-stone-200 overflow-hidden">
          <img src="https://picsum.photos/seed/chatuser/100/100" alt="User" referrerPolicy="no-referrer" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-stone-800 text-sm">Juma Hamisi</h3>
          <p className="text-[10px] text-emerald-500 font-bold">Yupo Mtandaoni</p>
        </div>
        <button className="p-2 text-stone-400">
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={cn(
              "flex flex-col max-w-[80%]",
              msg.sender === 'me' ? "ml-auto items-end" : "mr-auto items-start"
            )}
          >
            <div className={cn(
              "px-4 py-3 rounded-2xl text-sm",
              msg.sender === 'me' 
                ? "bg-orange-600 text-white rounded-tr-none" 
                : "bg-stone-100 text-stone-800 rounded-tl-none"
            )}>
              {msg.text}
            </div>
            <span className="text-[9px] text-stone-400 mt-1 font-medium">{msg.time}</span>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-stone-100 bg-white">
        <div className="flex items-center gap-2 bg-stone-100 rounded-2xl px-4 py-2">
          <button className="text-stone-400">
            <Image size={20} />
          </button>
          <input 
            type="text" 
            placeholder="Andika ujumbe..." 
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2"
          />
          <button className="text-stone-400">
            <Mic size={20} />
          </button>
          <button className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center">
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
