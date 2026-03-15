import React, { useEffect, useState } from 'react';
import { Package, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { useFirebase } from '../contexts/FirebaseContext';

interface DeliveryItem {
  id: string;
  productName: string;
  sellerName: string;
  status: 'Inatayarishwa' | 'Njia' | 'Imefika';
  createdAt: any;
  location: string;
  image?: string;
  progress?: number;
}

const StatusBadge = ({ status }: { status: DeliveryItem['status'] }) => {
  const configs = {
    'Inatayarishwa': { color: 'bg-amber-100 text-amber-700', icon: Clock, label: 'Inatayarishwa' },
    'Njia': { color: 'bg-blue-100 text-blue-700', icon: Truck, label: 'Njia' },
    'Imefika': { color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle, label: 'Imefika' }
  };

  const { color, icon: Icon, label } = configs[status];

  return (
    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${color}`}>
      <Icon size={12} />
      {label}
    </div>
  );
};

export const KujaKwako = () => {
  const { user } = useFirebase();
  const [deliveries, setDeliveries] = useState<DeliveryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'orders'),
      where('buyerUid', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as DeliveryItem[];
      setDeliveries(ordersData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'orders');
    });

    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return (
      <div className="p-4 space-y-4">
        <div className="h-8 w-48 bg-stone-200 animate-pulse rounded-lg" />
        <div className="space-y-4">
          {[1, 2].map(i => (
            <div key={i} className="h-40 bg-stone-100 animate-pulse rounded-[2rem]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-black text-stone-800 tracking-tight">Kuja Kwako</h2>
        <p className="text-sm text-stone-500">Fuatilia bidhaa zako zinazokuja kwako sasa hivi.</p>
      </div>

      <div className="space-y-4">
        {deliveries.length > 0 ? (
          deliveries.map((delivery, index) => (
            <motion.div 
              key={delivery.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[2rem] p-5 border border-stone-100 shadow-sm space-y-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-stone-100 flex-shrink-0">
                  <img 
                    src={delivery.image || `https://picsum.photos/seed/${delivery.id}/200/200`} 
                    alt={delivery.productName} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-stone-800 text-base truncate">{delivery.productName}</h3>
                      <p className="text-xs text-stone-500">Kutoka: <span className="font-semibold text-stone-700">{delivery.sellerName || 'Muuzaji'}</span></p>
                    </div>
                    <StatusBadge status={delivery.status} />
                  </div>
                </div>
              </div>

              <div className="h-px bg-stone-50" />

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-stone-500">
                  <MapPin size={14} className="text-orange-500" />
                  <span>{delivery.location || 'Inatayarishwa...'}</span>
                </div>
                <div className="text-stone-400 font-medium">
                  {delivery.createdAt?.toDate().toLocaleDateString('sw-TZ', { day: 'numeric', month: 'short' })}
                </div>
              </div>

              {delivery.status === 'Njia' && (
                <div className="pt-2">
                  <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${delivery.progress || 50}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-orange-600 rounded-full"
                    />
                  </div>
                  <p className="text-[10px] text-orange-600 font-bold mt-2 text-right">Inakuja hivi punde...</p>
                </div>
              )}
            </motion.div>
          ))
        ) : (
          <div className="pt-8 text-center space-y-4">
            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-300">
              <Package size={32} />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-stone-800">Je, unataka kuagiza zaidi?</p>
              <p className="text-xs text-stone-500">Gundua bidhaa mpya kwenye soko letu.</p>
            </div>
            <button className="px-6 py-3 bg-stone-900 text-white rounded-2xl text-xs font-bold">Nenda Sokoni</button>
          </div>
        )}
      </div>
    </div>
  );
};
