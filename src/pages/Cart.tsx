/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Trash2, ShoppingBag, CreditCard, Wallet, Truck, MapPin, Clock, ArrowRight, Gift, Percent, Flame, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const navigate = useNavigate();
  const { items, totalPrice, totalCalories, removeFromCart, updateQuantity, clearCart } = useCart();
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [isGift, setIsGift] = useState(false);

  const deliveryFee = items.length > 0 ? 5.00 : 0;
  const grandTotal = totalPrice + deliveryFee;

  const handleCheckout = () => {
    // In a real app, save to Firestore
    const orderId = Math.random().toString(36).substr(2, 9);
    clearCart();
    navigate(`/track/${orderId}`);
  };

  if (items.length === 0 && checkoutStep === 1) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
        <div className="bg-brand-pink p-8 rounded-[40px]">
          <ShoppingBag size={80} className="text-brand-accent scale-110" />
        </div>
        <h1 className="text-3xl font-serif font-bold italic">Your cart is empty</h1>
        <p className="text-brand-brown/60 max-w-xs">It looks like you haven't added any sweets yet. Life is short, eat dessert first!</p>
        <button 
          onClick={() => navigate('/menu')}
          className="bg-brand-accent text-white px-8 py-3 rounded-2xl font-bold premium-shadow hover:scale-105 transition-all"
        >
          Explore Menu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-12 items-start pb-24">
      {/* Left Side: Items or Checkout Info */}
      <div className="lg:col-span-2 space-y-12">
        {checkoutStep === 1 ? (
          <section className="space-y-8">
            <div className="px-2">
              <span className="text-[10px] bg-brand-pink/10 text-brand-pink font-black px-3 py-1 rounded-sm uppercase tracking-widest mb-4 inline-block">Checkout</span>
              <h1 className="text-5xl font-serif font-black italic tracking-tighter leading-none mb-2">My Sugar Bag</h1>
              <p className="text-brand-brown/40 font-medium italic">You're just moments away from sweetness</p>
            </div>

            <div className="space-y-6">
              {items.map((item) => (
                <motion.div 
                  layout
                  key={item.id} 
                  className="bg-white rounded-[2.5rem] p-6 flex gap-6 premium-shadow border border-pink-50 group transition-all hover:border-brand-pink/30 hover:scale-[1.01]"
                >
                  <div className="w-28 h-28 rounded-[2rem] overflow-hidden shrink-0 shadow-lg">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-serif text-2xl font-black italic tracking-tight">{item.name}</h3>
                        <button onClick={() => removeFromCart(item.id)} className="p-2 text-brand-brown/20 hover:text-red-400 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.customization?.size && (
                          <span className="text-[10px] bg-brand-light-pink text-brand-pink px-3 py-1 rounded-full font-black uppercase tracking-widest">{item.customization.size}</span>
                        )}
                        {item.customization?.addOns?.map(addon => (
                          <span key={addon} className="text-[10px] bg-brand-cream border border-pink-100 px-3 py-1 rounded-full text-brand-brown/40 font-black uppercase tracking-widest">{addon}</span>
                        ))}
                      </div>
                    </div>
                    <div className="pt-4 flex items-center justify-between">
                      <div className="flex items-center gap-5 bg-brand-cream/50 rounded-full px-4 py-2 border border-pink-100">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-brand-pink font-black hover:scale-125 transition-transform">-</button>
                        <span className="text-sm font-black w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-brand-pink font-black hover:scale-125 transition-transform">+</button>
                      </div>
                      <span className="text-2xl font-black italic tracking-tight">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-brand-brown text-white p-10 rounded-[3rem] space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-pink/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50" />
              <div className="flex items-center gap-6 justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                    <Gift className="text-brand-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Send as a Gift?</h4>
                    <p className="text-xs text-white/40 italic">Complimentary luxury packaging included</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsGift(!isGift)}
                  className={`w-14 h-7 rounded-full transition-all relative ${isGift ? 'bg-brand-pink' : 'bg-white/10'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all ${isGift ? 'left-8' : 'left-1'}`} />
                </button>
              </div>
              {isGift && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="pt-4 overflow-hidden relative z-10">
                  <textarea 
                    placeholder="Write a sweet message to your loved one..." 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm focus:outline-none h-32 focus:border-brand-pink/50 placeholder:text-white/20 italic"
                  />
                </motion.div>
              )}
            </div>
          </section>
        ) : (
          <section className="space-y-12 pb-12 px-2">
            <div>
              <span className="text-[10px] bg-brand-pink/10 text-brand-pink font-black px-3 py-1 rounded-sm uppercase tracking-widest mb-4 inline-block">Checkout</span>
              <h1 className="text-5xl font-serif font-black italic tracking-tighter leading-none mb-2">Delivery Details</h1>
              <p className="text-brand-brown/40 font-medium italic">Almost there, where should we bring the magic?</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-brown/40 ml-2">Delivery Address</span>
                  <div className="relative">
                    <input type="text" className="w-full bg-white border border-pink-100 rounded-[2rem] p-6 pl-14 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-brand-pink/5 focus:border-brand-pink transition-all" placeholder="123 Sweet Lane, Pastry City" />
                    <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-pink" size={20} />
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-brown/40 ml-2">Preferred Slot</span>
                  <div className="relative">
                    <select className="w-full bg-white border border-pink-100 rounded-[2rem] p-6 pl-14 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-brand-pink/5 focus:border-brand-pink transition-all appearance-none cursor-pointer">
                      <option>Today, 6:00 PM - 7:00 PM</option>
                      <option>Today, 7:00 PM - 8:00 PM</option>
                      <option>Tomorrow, 12:00 PM - 1:00 PM</option>
                    </select>
                    <Clock className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-pink" size={20} />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-brown/40 ml-2">Special Instructions</span>
                <textarea className="w-full bg-white border border-pink-100 rounded-[2.5rem] p-8 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-brand-pink/5 focus:border-brand-pink transition-all h-[184px] resize-none italic" placeholder="Gate code, allergies, or anything else we should know..." />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-serif font-black italic tracking-tight flex items-center gap-2 px-2">Payment Method</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { id: 'COD', icon: Wallet, label: 'CASH ON DELIVERY' },
                  { id: 'Card', icon: CreditCard, label: 'CREDIT / DEBIT' },
                  { id: 'JazzCash', icon: Smartphone, label: 'JAZZCASH' },
                  { id: 'Easypaisa', icon: Smartphone, label: 'EASYPAISA' },
                ].map((m) => (
                   <button
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id)}
                    className={`p-6 rounded-[2rem] border-2 flex flex-col items-center gap-4 transition-all duration-500
                      ${paymentMethod === m.id ? 'border-brand-pink bg-brand-light-pink text-brand-pink shadow-xl scale-105' : 'border-pink-50 bg-white text-brand-brown/20 hover:border-brand-pink/40 hover:text-brand-brown/60'}
                    `}
                   >
                     <div className={`p-3 rounded-2xl ${paymentMethod === m.id ? 'bg-brand-pink text-white' : 'bg-brand-cream'}`}>
                      <m.icon size={22} />
                     </div>
                     <span className="text-[9px] font-black uppercase tracking-widest">{m.label}</span>
                   </button>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Right Side: Summary Card */}
      <section className="bg-white rounded-[3.5rem] p-10 premium-shadow border border-pink-50 space-y-10 sticky top-32">
        <div>
          <h2 className="text-3xl font-serif font-black italic tracking-tight mb-2 underline decoration-brand-pink decoration-4 underline-offset-4">Summary</h2>
          <p className="text-[10px] text-brand-brown/40 font-black uppercase tracking-widest">Order Review</p>
        </div>
        
        <div className="space-y-5 border-b border-pink-100 pb-8">
          <div className="flex justify-between items-center text-brand-brown/60">
            <span className="text-xs font-black uppercase tracking-widest">Subtotal</span>
            <span className="text-lg font-black italic tracking-tight text-brand-brown">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-brand-brown/60">
            <span className="text-xs font-black uppercase tracking-widest">Delivery</span>
            <span className="text-lg font-black italic tracking-tight text-brand-brown">${deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center bg-brand-gold/10 p-3 rounded-2xl border border-brand-gold/20">
            <span className="text-[9px] font-black uppercase tracking-widest text-brand-gold flex items-center gap-2">
              <Sparkles size={12} className="animate-pulse" /> Loyalty Rewards
            </span>
            <span className="text-sm font-black italic text-brand-gold">+{(totalPrice * 0.1).toFixed(0)} PTS</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[10px] text-brand-brown/30 font-black uppercase tracking-widest text-center">Grand Total</span>
          <div className="text-6xl font-serif font-black italic text-brand-brown tracking-tighter text-center">
            <span className="text-2xl align-top mr-1 font-sans font-black">$</span>
            {grandTotal.toFixed(2)}
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="PROMO CODE" 
              className="w-full bg-brand-cream border border-pink-100 rounded-full p-4 pl-6 pr-20 text-xs font-black focus:outline-none focus:ring-4 focus:ring-brand-pink/5 focus:border-brand-pink transition-all uppercase tracking-widest placeholder:text-brand-brown/20"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-brown text-white w-14 h-10 rounded-full flex items-center justify-center text-[10px] font-black hover:bg-brand-pink transition-all">APPLY</button>
          </div>

          <div className="bg-brand-pink/5 p-4 rounded-2xl border border-pink-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Flame size={16} className="text-brand-pink" />
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-brown/40">Nutritional Energy</span>
            </div>
            <span className="text-xs font-black italic text-brand-pink">{totalCalories} KCAL</span>
          </div>
        </div>

        {checkoutStep === 1 ? (
          <button 
            onClick={() => setCheckoutStep(2)}
            className="w-full bg-brand-brown text-white py-6 rounded-full font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-brand-pink transition-all duration-500 shadow-2xl hover:scale-105 active:scale-95 group"
          >
            CONFIRM DETAILS <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </button>
        ) : (
          <div className="space-y-4">
            <button 
              onClick={handleCheckout}
              className="w-full bg-brand-pink text-white py-6 rounded-full font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl hover:shadow-brand-pink/30 hover:scale-[1.03] transition-all active:scale-95 group"
            >
              PLACE ORDER <Cake size={18} className="animate-bounce" />
            </button>
            <button 
              onClick={() => setCheckoutStep(1)}
              className="w-full text-brand-brown/30 text-[10px] font-black uppercase tracking-widest hover:text-brand-pink transition-colors"
            >
              MODIFY CART
            </button>
          </div>
        )}

        <div className="flex items-center justify-center gap-6 text-brand-brown/10">
          <Truck size={18} />
          <CreditCard size={18} />
          <MapPin size={18} />
          <Info size={18} />
        </div>
      </section>
    </div>
  );
}

const Smartphone = ({ size, className }: { size?: number, className?: string }) => (
  <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>
  </svg>
);
