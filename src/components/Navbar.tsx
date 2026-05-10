/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Cake, Mic } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { totalItems } = useCart();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 pointer-events-none hidden md:block">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/80 backdrop-blur-xl border border-white/20 px-8 py-4 rounded-full premium-shadow pointer-events-auto">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-brand-pink rounded-full flex items-center justify-center text-white transition-transform group-hover:rotate-12">
            <Cake size={24} />
          </div>
          <div>
            <span className="text-xl font-serif font-black italic tracking-tighter leading-none block">Sugar Rush</span>
            <span className="text-[10px] text-brand-pink font-bold uppercase tracking-widest leading-none">The Sweet Studio</span>
          </div>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-sm mx-10 relative group">
          <input 
            type="text" 
            placeholder="Search cravings..." 
            className="w-full h-11 bg-brand-cream/50 border border-brand-pink/20 rounded-full px-12 text-sm focus:outline-none focus:ring-4 focus:ring-brand-pink/5 focus:border-brand-pink transition-all"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-pink" size={16} />
        </div>

        <div className="flex items-center gap-8">
          <Link to="/menu" className="text-xs font-black uppercase tracking-widest text-brand-brown/60 hover:text-brand-pink transition-colors">Menu</Link>
          <Link to="/custom-sundae" className="text-xs font-black uppercase tracking-widest text-brand-brown/60 hover:text-brand-pink transition-colors">Build</Link>
          
          <Link to="/cart" className="relative p-3 bg-brand-light-pink rounded-full text-brand-pink hover:bg-brand-pink hover:text-white transition-all duration-300">
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-gold text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm font-sans">
                {totalItems}
              </span>
            )}
          </Link>
          
          <button 
            onClick={() => navigate('/profile')} 
            className="w-11 h-11 bg-brand-brown text-white rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-lg"
          >
            <User size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}
