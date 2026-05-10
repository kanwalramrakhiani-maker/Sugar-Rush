/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
  loyaltyPoints: number;
  role: 'user' | 'admin';
}

export interface Dessert {
  id: string;
  name: string;
  description: string;
  price: number;
  category: DessertCategory;
  calories: number;
  sweetnessMeter: number; // 1-5
  image: string;
  ratings: number;
  reviewCount: number;
  isBestSeller: boolean;
  tags: string[];
  ingredients: string[];
  deliveryTime?: string;
}

export type DessertCategory = 
  | 'Cakes & Pastries'
  | 'Traditional Meetha'
  | 'Ice Cream & Frozen'
  | 'Cold Desserts'
  | 'Hot Desserts'
  | 'Drinks + Meetha';

export interface OrderItem {
  id: string;
  dessertId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  customization?: {
    size?: string;
    addOns?: string[];
    customMessage?: string;
    candle?: boolean;
    themeDecoration?: string;
  };
}

export type OrderStatus = 
  | 'received' 
  | 'mixing' 
  | 'baking' 
  | 'decorating' 
  | 'packed' 
  | 'out_for_delivery' 
  | 'delivered';

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  totalCalories: number;
  status: OrderStatus;
  createdAt: any; // Firestore Timestamp
  deliveryAddress: string;
  deliveryNotes?: string;
  deliveryTimeSlot?: string;
  paymentMethod: string;
  isGift: boolean;
  giftMessage?: string;
  giftVideoNote?: string;
  loyaltyPointsEarned: number;
}

export interface Review {
  id: string;
  dessertId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  images: string[];
  createdAt: any;
}
