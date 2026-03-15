import React, { useEffect, useState } from 'react';
import { Settings, Edit3, Grid, Music, Heart, Package, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';
import { useFirebase } from '../contexts/FirebaseContext';
import { signOut } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';

export const Profile = () => {
  const { user, auth } = useFirebase();
  const [activeTab, setActiveTab] = useState('posts');
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (doc) => {
      if (doc.exists()) {
        setProfile(doc.data());
      }
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, `users/${user.uid}`);
    });

    return () => unsubscribe();
  }, [user]);

  const handleLogout = () => {
    signOut(auth);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="relative">
        <div className="h-32 bg-orange-600" />
        <div className="px-4 -mt-12 flex items-end justify-between">
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl border-4 border-white overflow-hidden bg-stone-200">
              <img 
                src={profile?.photoURL || user?.photoURL || "https://picsum.photos/seed/myprofile/300/300"} 
                alt="Profile" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {profile?.role === 'admin' && (
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-[8px] text-white font-bold">✓</span>
              </div>
            )}
          </div>
          <div className="flex gap-2 mb-2">
            <button 
              onClick={handleLogout}
              className="p-2 rounded-xl bg-white border border-stone-200 text-red-500 hover:bg-red-50 transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
            <button className="p-2 rounded-xl bg-white border border-stone-200 text-stone-600">
              <Settings size={20} />
            </button>
            <button className="px-4 py-2 rounded-xl bg-stone-900 text-white text-sm font-bold flex items-center gap-2">
              <Edit3 size={16} /> Hariri
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-1">
        <h2 className="text-2xl font-black text-stone-800 tracking-tight">{profile?.displayName || user?.displayName || "Mtumiaji wa KUKWA"}</h2>
        <p className="text-sm text-stone-500 font-medium">{profile?.email || user?.email}</p>
        <p className="text-sm text-stone-600 pt-2 leading-relaxed">
          {profile?.bio || "Mbunifu wa mavazi na mpenzi wa muziki wa asili. Kutoka Kwangu Kuja Kwako! 🇹🇿"}
        </p>
      </div>

      {/* Stats */}
      <div className="flex justify-around py-4 border-y border-stone-100">
        <div className="text-center">
          <p className="text-lg font-black text-stone-800">0</p>
          <p className="text-[10px] text-stone-400 uppercase font-bold tracking-widest">Wafuasi</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-black text-stone-800">0</p>
          <p className="text-[10px] text-stone-400 uppercase font-bold tracking-widest">Wanaofuata</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-black text-stone-800">0</p>
          <p className="text-[10px] text-stone-400 uppercase font-bold tracking-widest">Bidhaa</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4">
        <div className="flex bg-stone-100 p-1 rounded-2xl">
          {[
            { id: 'posts', icon: Grid, label: 'Posti' },
            { id: 'products', icon: Package, label: 'Bidhaa' },
            { id: 'music', icon: Music, label: 'Muziki' },
            { id: 'likes', icon: Heart, label: 'Likes' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all",
                activeTab === tab.id 
                  ? "bg-white text-orange-600 shadow-sm" 
                  : "text-stone-400 hover:text-stone-600"
              )}
            >
              <tab.icon size={16} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="px-4 grid grid-cols-3 gap-1 pb-20">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <div key={i} className="aspect-square bg-stone-200 overflow-hidden">
            <img 
              src={`https://picsum.photos/seed/profile_post_${i}/300/300`} 
              alt="Post" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
