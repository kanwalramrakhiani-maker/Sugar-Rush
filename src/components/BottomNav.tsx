/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Grid, ShoppingBag, User, PlusCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function BottomNav() {
  const { totalItems } = useCart();

  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/menu', icon: Grid, label: 'Menu' },
    { to: '/custom-sundae', icon: PlusCircle, label: 'Create', highlight: true },
    { to: '/cart', icon: ShoppingBag, label: 'Cart', count: totalItems },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-6 left-6 right-6 h-20 bg-brand-brown text-white/50 md:hidden flex items-center justify-around px-4 z-50 rounded-full premium-shadow border border-white/10">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => `
            flex flex-col items-center gap-1 transition-all duration-300
            ${isActive ? 'text-brand-pink scale-110' : 'hover:text-white'}
            ${item.highlight ? 'bg-brand-pink text-white p-4 rounded-full -translate-y-8 shadow-2xl rotate-12' : ''}
          `}
        >
          <div className="relative">
            <item.icon size={item.highlight ? 24 : 20} />
            {item.count !== undefined && item.count > 0 && !item.highlight && (
              <span className="absolute -top-2 -right-2 bg-brand-pink text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {item.count}
              </span>
            )}
          </div>
          {!item.highlight && <span className="text-[10px] font-black uppercase tracking-widest leading-none mt-1">{item.label}</span>}
        </NavLink>
      ))}
    </nav>
  );
}
