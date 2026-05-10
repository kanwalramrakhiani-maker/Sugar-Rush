/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, ShoppingBag, Heart, Star, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_DESSERTS } from '../data/mockData';
import { DessertCategory } from '../types';
import { useCart } from '../context/CartContext';

export default function MenuList() {
  const [selectedCategory, setSelectedCategory] = useState<DessertCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const { addToCart } = useCart();

  const categories: (DessertCategory | 'All')[] = [
    'All', 'Cakes & Pastries', 'Traditional Meetha', 'Ice Cream & Frozen', 'Cold Desserts', 'Hot Desserts', 'Drinks + Meetha'
  ];

  const filterTags = ['Sugar-Free', 'Eggless', 'Keto', 'Vegan', 'Gluten-Free', 'Best Seller'];

  const filteredDesserts = MOCK_DESSERTS.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilters = activeFilters.length === 0 || activeFilters.every(f => item.tags.includes(f));
    return matchesCategory && matchesSearch && matchesFilters;
  });

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]);
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div>
          <span className="text-[10px] bg-brand-pink/10 text-brand-pink font-black px-3 py-1 rounded-sm uppercase tracking-widest mb-4 inline-block">Our Collection</span>
          <h1 className="text-5xl font-serif font-black italic tracking-tighter leading-none mb-2">The Sweet Library</h1>
          <p className="text-brand-brown/40 font-medium italic">Handpicked favorites for your cravings</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Search cravings..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-72 bg-white border border-pink-100 rounded-full py-3 px-12 text-sm focus:outline-none focus:ring-4 focus:ring-brand-pink/5 transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-pink" size={18} />
          </div>
          <button className="p-3 bg-brand-brown text-white rounded-full hover:scale-110 transition-all shadow-lg active:scale-95">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Categories Scroll */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 hide-scrollbar px-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`
              whitespace-nowrap px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-500
              ${selectedCategory === cat ? 'bg-brand-pink text-white shadow-xl shadow-brand-pink/20 scale-105' : 'bg-white text-brand-brown/40 hover:bg-brand-light-pink hover:text-brand-pink border border-pink-50'}
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Filter Tags */}
      <div className="flex flex-wrap gap-2 px-2">
        {filterTags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleFilter(tag)}
            className={`
              px-5 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all
              ${activeFilters.includes(tag) ? 'bg-brand-brown text-white border-brand-brown shadow-lg' : 'bg-white border-pink-100 text-brand-brown/30 hover:border-brand-pink'}
            `}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredDesserts.map((dessert) => (
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            key={dessert.id}
            className="group flex flex-col"
          >
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-6 premium-shadow">
              <Link to={`/dessert/${dessert.id}`} className="block h-full">
                <img 
                  src={dessert.image} 
                  alt={dessert.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
              </Link>
              <div className="absolute top-6 right-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <button className="p-3 bg-white/90 backdrop-blur-md rounded-full text-brand-pink hover:bg-brand-pink hover:text-white transition-all shadow-xl">
                  <Heart size={18} />
                </button>
              </div>
              {dessert.isBestSeller && (
                <div className="absolute top-6 left-6 bg-brand-gold text-black px-4 py-1.5 rounded-full text-[9px] font-black flex items-center gap-1 uppercase tracking-widest shadow-xl">
                  <Flame size={12} fill="currentColor" /> TRENDING
                </div>
              )}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div className="text-white">
                  <span className="text-[10px] font-black uppercase tracking-widest block mb-1 drop-shadow-md text-white/80">{dessert.category}</span>
                  <p className="text-2xl font-bold tracking-tight drop-shadow-lg">${dessert.price}</p>
                </div>
                <button 
                  onClick={() => addToCart({
                    id: dessert.id,
                    dessertId: dessert.id,
                    name: dessert.name,
                    price: dessert.price,
                    quantity: 1,
                    image: dessert.image
                  })}
                  className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-brand-brown hover:bg-brand-pink hover:text-white transition-all duration-500 shadow-2xl active:scale-90"
                >
                  <ShoppingBag size={22} />
                </button>
              </div>
            </div>

            <div className="px-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-0.5 text-brand-gold">
                  <Star size={14} fill="currentColor" />
                  <span className="text-xs font-black italic">{dessert.ratings}</span>
                </div>
                <span className="text-[10px] text-brand-brown/20 uppercase font-black tracking-widest">•</span>
                <span className="text-[10px] text-brand-brown/40 font-black uppercase tracking-widest">{dessert.calories} KCAL</span>
              </div>
              <h3 className="font-serif text-2xl font-black italic tracking-tight mb-2 group-hover:text-brand-pink transition-colors">{dessert.name}</h3>
              <p className="text-sm text-brand-brown/50 font-medium line-clamp-2 italic">{dessert.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredDesserts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-brand-brown/40 text-lg">No desserts found matching your filters. Try something else!</p>
        </div>
      )}
    </div>
  );
}
