/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { User, Settings, Package, Heart, Star, LogOut, ChevronRight, Gift, Clock, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();

  const orderHistory = [
    { id: 'SR-9821', date: 'Oct 24, 2023', items: 'Chocolate Fudge, Gulab Jamun', total: '$18.48', status: 'Delivered' },
    { id: 'SR-7732', date: 'Sep 12, 2023', items: 'Custom Sundae', total: '$12.99', status: 'Delivered' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12">
      {/* User Header */}
      <section className="bg-brand-brown text-white p-12 rounded-[50px] premium-shadow relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/20 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
        
        <div className="relative">
          <div className="w-32 h-32 rounded-[40px] bg-brand-pink p-1 rotate-3 hover:rotate-0 transition-transform">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover rounded-[36px]" alt="User" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-brand-gold p-2 rounded-xl text-brand-brown shadow-lg">
            <Award size={20} />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left space-y-2">
          <h1 className="text-4xl font-serif font-black italic tracking-tight">K. Ramrakhiani</h1>
          <p className="opacity-60 flex items-center justify-center md:justify-start gap-2">
            <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-brand-gold">Gold Member</span>
            <span>kanwal.r@gmail.com</span>
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-4">
             <div className="text-center md:text-left">
               <span className="text-[10px] uppercase font-bold opacity-40 block">Loyalty Points</span>
               <span className="text-2xl font-serif font-bold text-brand-gold italic">1,240 pts</span>
             </div>
             <div className="border-x border-white/10 px-6 text-center md:text-left">
               <span className="text-[10px] uppercase font-bold opacity-40 block">Total Orders</span>
               <span className="text-2xl font-serif font-bold italic">24</span>
             </div>
             <div className="text-center md:text-left">
               <span className="text-[10px] uppercase font-bold opacity-40 block">Favorite Category</span>
               <span className="text-2xl font-serif font-bold italic">Cakes</span>
             </div>
          </div>
        </div>

        <button className="p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all text-white/60 hover:text-white">
          <Settings size={24} />
        </button>
      </section>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Navigation Sidebar */}
        <div className="space-y-4">
           {[
             { name: 'Order History', icon: Clock, count: 24 },
             { name: 'My Favorites', icon: Heart, count: 8 },
             { name: 'Redeem Rewards', icon: Gift, count: '3 ready' },
             { name: 'Gift History', icon: Package, count: 2 },
           ].map((item) => (
             <button key={item.name} className="w-full p-6 bg-white rounded-3xl premium-shadow border border-brand-pink/20 flex items-center justify-between hover:bg-brand-pink hover:border-brand-accent/30 transition-all group">
               <div className="flex items-center gap-4">
                 <div className="p-3 bg-brand-cream rounded-2xl text-brand-accent">
                   <item.icon size={20} />
                 </div>
                 <span className="font-bold text-brand-brown">{item.name}</span>
               </div>
               <span className="text-xs font-bold text-brand-brown/30 group-hover:text-brand-accent">{item.count}</span>
             </button>
           ))}
           <button className="w-full p-6 text-red-400 font-bold flex items-center gap-4 hover:bg-red-50 rounded-3xl transition-all">
             <LogOut size={20} /> Sign Out
           </button>
        </div>

        {/* content area: recent orders */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif font-bold italic">Recent cravings</h2>
            <button className="text-brand-accent font-bold text-sm">View All History</button>
          </div>
          
          <div className="space-y-4">
            {orderHistory.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-[32px] premium-shadow border border-brand-pink/20 flex items-center justify-between group hover:border-brand-accent/50 transition-all">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-brand-pink rounded-2xl text-brand-accent">
                    <Package size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-brown">{order.id}</h4>
                    <p className="text-[10px] text-brand-brown/40 uppercase font-bold tracking-widest">{order.date}</p>
                    <p className="text-xs text-brand-brown/60 mt-1">{order.items}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block font-bold text-lg text-brand-brown">{order.total}</span>
                  <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-600 text-[10px] font-bold mt-1">
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Rewards Banner */}
          <div className="bg-linear-to-r from-brand-accent to-pink-400 p-8 rounded-[40px] text-white flex items-center justify-between premium-shadow relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-2xl font-serif font-bold italic mb-2">Claim Your Reward! 🍩</h3>
              <p className="text-sm opacity-80 mb-6 max-w-[200px]">You have enough points for a free box of Glazed Donuts.</p>
              <button className="bg-white text-brand-accent px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-all">
                Redeem Now <ChevronRight size={16} />
              </button>
            </div>
            <div className="relative animate-bounce">
              <Gift size={100} className="opacity-20 translate-x-10 -rotate-12 group-hover:rotate-0 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
