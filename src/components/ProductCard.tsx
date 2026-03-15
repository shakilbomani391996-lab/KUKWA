import React from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

interface ProductCardProps {
  title: string;
  price: number;
  image: string;
  sellerName: string;
  sellerImage: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ title, price, image, sellerName, sellerImage }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100 group">
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm text-stone-800 hover:text-red-500 transition-colors">
          <Heart size={18} />
        </button>
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-2">
          <img 
            src={sellerImage} 
            alt={sellerName} 
            className="w-5 h-5 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
          <span className="text-[10px] font-medium text-stone-500">{sellerName}</span>
        </div>
        <h3 className="font-bold text-stone-800 text-sm line-clamp-1">{title}</h3>
        <div className="flex items-center justify-between pt-1">
          <p className="text-orange-600 font-black text-base">{formatCurrency(price)}</p>
          <div className="flex gap-2">
            <button className="p-1.5 rounded-lg bg-stone-50 text-stone-400 hover:text-orange-600">
              <MessageCircle size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
