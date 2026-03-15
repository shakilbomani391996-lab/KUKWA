import React from 'react';
import { MapPin, Clock, ArrowRight, Plus } from 'lucide-react';

interface RequestCardProps {
  title: string;
  user: string;
  location: string;
  time: string;
  type: 'item' | 'service';
}

const RequestCard = ({ title, user, location, time, type }: RequestCardProps) => (
  <div className="bg-white p-5 rounded-[2rem] border border-stone-100 shadow-sm space-y-4">
    <div className="flex justify-between items-start">
      <div className="space-y-1">
        <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
          type === 'item' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
        }`}>
          {type === 'item' ? 'Bidhaa' : 'Huduma'}
        </span>
        <h3 className="text-lg font-black text-stone-800 leading-tight">{title}</h3>
      </div>
      <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
        <MapPin size={20} />
      </div>
    </div>
    
    <div className="flex items-center gap-3 text-stone-500">
      <div className="w-8 h-8 rounded-full bg-stone-200 overflow-hidden">
        <img src={`https://picsum.photos/seed/${user}/100/100`} alt={user} referrerPolicy="no-referrer" />
      </div>
      <div className="flex-1">
        <p className="text-xs font-bold text-stone-700">{user}</p>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="flex items-center gap-1"><MapPin size={10} /> {location}</span>
          <span className="flex items-center gap-1"><Clock size={10} /> {time}</span>
        </div>
      </div>
    </div>

    <button className="w-full py-3 bg-stone-900 text-white rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors">
      Saidia Sasa <ArrowRight size={16} />
    </button>
  </div>
);

export const RequestSystem = () => {
  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-stone-800">Maombi ya Moja kwa Moja</h2>
          <p className="text-xs text-stone-500">Saidia wengine au omba unachohitaji.</p>
        </div>
        <button className="w-12 h-12 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-lg shadow-orange-600/20">
          <Plus size={24} />
        </button>
      </div>

      <div className="space-y-4">
        <RequestCard 
          title="Natafuta Fundi wa Simu (iPhone)"
          user="Juma Hamisi"
          location="Kariakoo, Dar"
          time="Dakika 5 zilizopita"
          type="service"
        />
        <RequestCard 
          title="Nahitaji Mboga za Majani Fresh"
          user="Mama Maria"
          location="Mbezi Beach"
          time="Saa 1 lililopita"
          type="item"
        />
        <RequestCard 
          title="Kupata Usafiri wa Haraka kwenda Posta"
          user="Said Ally"
          location="Sinza"
          time="Saa 2 zilizopita"
          type="service"
        />
      </div>
    </div>
  );
};
