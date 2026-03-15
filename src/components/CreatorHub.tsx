import React, { useEffect, useState } from 'react';
import { Play, Music, Video, Heart, MessageCircle } from 'lucide-react';
import { collection, query, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';

interface ContentItemProps {
  title: string;
  creator: string;
  thumbnail: string;
  type: 'music' | 'video';
  likes: number;
}

const ContentItem: React.FC<ContentItemProps> = ({ title, creator, thumbnail, type, likes }) => (
  <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-stone-100 shadow-sm">
    <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
      <img 
        src={thumbnail} 
        alt={title} 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
        {type === 'music' ? <Music size={20} className="text-white" /> : <Play size={20} className="text-white" />}
      </div>
    </div>
    <div className="flex-1 min-w-0">
      <h3 className="font-bold text-stone-800 text-sm truncate">{title}</h3>
      <p className="text-xs text-stone-500">{creator}</p>
      <div className="flex items-center gap-3 mt-1">
        <span className="flex items-center gap-1 text-[10px] text-stone-400">
          <Heart size={10} /> {likes}
        </span>
        <span className="flex items-center gap-1 text-[10px] text-stone-400">
          <MessageCircle size={10} /> 12
        </span>
      </div>
    </div>
    <button className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center">
      <Play size={18} fill="currentColor" />
    </button>
  </div>
);

export const CreatorHub = () => {
  const [music, setMusic] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const musicQuery = query(collection(db, 'content'), orderBy('createdAt', 'desc'), limit(10));
    const unsubscribeMusic = onSnapshot(musicQuery, (snapshot) => {
      const musicData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMusic(musicData.filter((item: any) => item.type === 'music'));
      setVideos(musicData.filter((item: any) => item.type === 'video'));
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'content');
    });

    return () => unsubscribeMusic();
  }, []);

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-black text-stone-800">Sauti za KUKWA</h2>
        <p className="text-sm text-stone-500">Muziki na maudhui ya kipekee kutoka kwa wasanii wako.</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-stone-800">Muziki Mpya</h3>
          <button className="text-orange-600 text-xs font-bold">Ona Zote</button>
        </div>
        <div className="space-y-3">
          {loading ? (
            [1, 2].map(i => <div key={i} className="h-24 bg-stone-100 animate-pulse rounded-2xl" />)
          ) : music.length > 0 ? (
            music.map((item) => (
              <ContentItem 
                key={item.id}
                title={item.title}
                creator={item.creator}
                thumbnail={item.thumbnail}
                type="music"
                likes={item.likes || 0}
              />
            ))
          ) : (
            <p className="text-xs text-stone-400 text-center py-4">Hakuna muziki bado.</p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-stone-800">Video Fupi</h3>
          <button className="text-orange-600 text-xs font-bold">Ona Zote</button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {loading ? (
            [1, 2, 3].map(i => <div key={i} className="w-40 aspect-[9/16] bg-stone-100 animate-pulse rounded-3xl flex-shrink-0" />)
          ) : videos.length > 0 ? (
            videos.map((item) => (
              <div key={item.id} className="relative w-40 aspect-[9/16] rounded-3xl overflow-hidden flex-shrink-0 bg-stone-200">
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-4 flex flex-col justify-end">
                  <p className="text-white text-xs font-bold truncate">{item.title}</p>
                  <p className="text-white/70 text-[10px]">@{item.creator}</p>
                </div>
                <div className="absolute top-4 right-4 flex flex-col gap-3">
                  <button className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white">
                    <Heart size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-stone-400 text-center w-full py-4">Hakuna video bado.</p>
          )}
        </div>
      </div>
    </div>
  );
};
