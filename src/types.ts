/**
 * KUKWA Type Definitions
 */

export type UserRole = 'user' | 'creator' | 'seller' | 'admin';

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  phoneNumber?: string;
  photoURL?: string;
  bio?: string;
  role: UserRole;
  isVerified: boolean;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  followersCount: number;
  followingCount: number;
  createdAt: string;
}

export interface Product {
  id: string;
  sellerId: string;
  sellerName: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  images: string[];
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface Content {
  id: string;
  creatorId: string;
  creatorName: string;
  type: 'music' | 'video' | 'digital';
  title: string;
  description: string;
  thumbnailUrl: string;
  mediaUrl: string;
  likesCount: number;
  commentsCount: number;
  isPremium: boolean;
  price?: number;
  createdAt: string;
}

export interface RequestItem {
  id: string;
  userId: string;
  userName: string;
  title: string;
  description: string;
  type: 'item' | 'service';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: 'open' | 'fulfilled' | 'cancelled';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  createdAt: string;
  read: boolean;
}

export interface ChatRoom {
  id: string;
  participants: string[];
  lastMessage?: string;
  updatedAt: string;
}
