/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Star, Clock, Flame, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_DESSERTS } from '../data/mockData';

export default function Home() {
  const [activeMood, setActiveMood] = useState<string | null>(null);

  const moods = [
    { name: 'Sad', emoji: '🥺', suggest: 'Triple Chocolate Brownie' },
    { name: 'Happy', emoji: '😊', suggest: 'Sundae Special' },
    { name: 'Celebrating', emoji: '🥳', suggest: 'Red Velvet Cake' },
    { name: 'Stressed', emoji: '😫', suggest: 'Lava Cake' },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-[480px] rounded-[3rem] overflow-hidden premium-shadow group">
        <img 
          src="https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=1200" 
          alt="Hero Dessert" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-r from-brand-brown/80 via-brand-brown/40 to-transparent flex flex-col justify-center px-8 md:px-16 text-white z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="bg-brand-gold text-black text-[10px] font-black px-3 py-1 rounded-sm w-fit uppercase mb-4 inline-block tracking-widest">
              Limited Time Only ✨
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-black italic mb-4 leading-tight tracking-tight">
              Ras Malai <br /> Cheesecake
            </h1>
            <p className="text-lg text-white/70 mb-8 max-w-md font-medium">
              The perfect fusion of traditional cream and modern pastry. Every craving deserves dessert.
            </p>
            <Link 
              to="/menu" 
              className="bg-white text-brand-brown px-10 py-4 rounded-full font-bold flex items-center gap-2 w-fit hover:gap-4 transition-all duration-300 shadow-xl"
            >
              ORDER NOW <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mood Selector AI */}
      <section className="bg-linear-to-br from-brand-pink to-[#FF6B8B] p-10 rounded-[3rem] text-center text-white shadow-xl shadow-brand-pink/20">
        <h2 className="text-2xl font-serif font-bold italic mb-2 flex items-center justify-center gap-2">
          How's your mood today? <Sparkles className="text-brand-gold animate-pulse" />
        </h2>
        <p className="opacity-70 mb-8 text-sm italic font-medium">“Every craving deserves dessert”</p>
        
        <div className="flex flex-wrap justify-center gap-4">
          {moods.map((mood) => (
            <button
              key={mood.name}
              onClick={() => setActiveMood(mood.name)}
              className={`
                w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all duration-500
                ${activeMood === mood.name ? 'bg-white text-brand-pink scale-125 shadow-2xl rotate-12' : 'bg-white/20 text-white hover:bg-white/30'}
              `}
            >
              <span>{mood.emoji}</span>
            </button>
          ))}
        </div>

        <AnimatePresence>
          {activeMood && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="mt-8 bg-white/10 backdrop-blur-md rounded-2xl p-4 inline-block border border-white/20"
            >
              <p className="text-sm font-medium">
                Our Suggestion: <span className="text-brand-gold font-black italic underline decoration-2">{moods.find(m => m.name === activeMood)?.suggest}</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Categories */}
      <section>
        <div className="flex items-center justify-between mb-8 px-2">
          <h2 className="text-2xl font-bold tracking-tight">Boutique Categories</h2>
          <Link to="/menu" className="text-brand-pink text-xs font-bold uppercase tracking-widest hover:underline">See All</Link>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-6 hide-scrollbar px-2">
          {[
            { icon: '🍰', name: 'Cakes', bg: 'bg-pink-50' },
            { icon: '🍩', name: 'Pastries', bg: 'bg-amber-50' },
            { icon: '🍨', name: 'Ice Cream', bg: 'bg-blue-50' },
            { icon: '🍮', name: 'Pudding', bg: 'bg-orange-50' },
            { icon: '🥤', name: 'Drinks', bg: 'bg-green-50' },
            { icon: '🍬', name: 'Halwa', bg: 'bg-purple-50' },
          ].map((cat) => (
            <div key={cat.name} className={`${cat.bg} min-w-[120px] h-40 rounded-[2.5rem] p-6 flex flex-col items-center justify-center border border-brand-pink/10 hover:scale-105 transition-transform duration-300 cursor-pointer premium-shadow`}>
              <div className="text-4xl mb-4">{cat.icon}</div>
              <span className="font-bold text-[11px] uppercase tracking-wider">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Trending & Best Sellers */}
      <section className="grid md:grid-cols-2 gap-12">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Flame className="text-orange-500" fill="currentColor" />
            <h2 className="text-3xl font-serif font-bold italic">Trending Now</h2>
          </div>
          <div className="space-y-4">
            {MOCK_DESSERTS.slice(0, 3).map((item) => (
              <Link key={item.id} to={`/dessert/${item.id}`} className="flex items-center gap-4 bg-white p-3 rounded-2xl glass hover:shadow-lg transition-all border border-brand-pink/50">
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                <div className="flex-1">
                  <h3 className="font-bold">{item.name}</h3>
                  <div className="flex items-center gap-1 text-brand-gold text-xs">
                    <Star size={12} fill="currentColor" />
                    <span>{item.ratings}</span>
                    <span className="text-brand-brown/40 ml-1">({item.reviewCount})</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-brand-accent">${item.price}</span>
                  <div className="text-[10px] text-brand-brown/50 flex justify-end items-center gap-1">
                    <Clock size={10} /> 30m
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-8">
            <Star className="text-brand-gold" fill="currentColor" />
            <h2 className="text-3xl font-serif font-bold italic">Best Sellers</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {MOCK_DESSERTS.slice(3, 5).map((item) => (
              <div key={item.id} className="bg-white rounded-3xl overflow-hidden group premium-shadow border border-brand-pink/30">
                <div className="relative h-40">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-lg font-bold text-xs">
                    ${item.price}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm mb-1">{item.name}</h3>
                  <Link to={`/dessert/${item.id}`} className="text-brand-accent text-xs font-bold flex items-center gap-1">
                    Shop Now <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banners */}
      <section className="bg-brand-brown text-white p-12 rounded-3xl text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
        <h2 className="text-4xl font-serif font-bold mb-4">Midnight Craving? 🌙</h2>
        <p className="opacity-80 mb-8">Use code <span className="text-brand-gold font-bold">LATE20</span> for 20% OFF between 11 PM - 3 AM</p>
        <button className="bg-white text-brand-brown px-8 py-3 rounded-full font-bold hover:bg-brand-gold transition-colors">
          Claim Now
        </button>
      </section>
    </div>
  );
}
