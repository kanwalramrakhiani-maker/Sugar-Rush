/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, Reorder, AnimatePresence } from 'motion/react';
import { ShoppingBag, Sparkles, Trash2, Info, ChevronRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CustomSundae() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [step, setStep] = useState(1);

  const [base, setBase] = useState('Vanilla');
  const [toppings, setToppings] = useState<string[]>([]);
  const [sauce, setSauce] = useState('Chocolate');

  const bases = ['Vanilla', 'Chocolate', 'Strawberry', 'Mango'];
  const availableToppings = ['Oreo', 'Nuts', 'Brownie Chunks', 'Fruits', 'Marshmallows', 'Sprinkles'];
  const sauces = ['Chocolate', 'Caramel', 'Strawberry'];

  const calculatePrice = () => 5.0 + (toppings.length * 0.75);
  const calculateCalories = () => 350 + (toppings.length * 50);

  const handleComplete = () => {
    addToCart({
      id: `custom-sundae-${Date.now()}`,
      dessertId: 'custom-sundae',
      name: `Custom ${base} Sundae`,
      price: calculatePrice(),
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=400',
      customization: {
        size: 'Regular',
        addOns: [...toppings, `Sauce: ${sauce}`]
      }
    });
    navigate('/cart');
  };

  const toggleTopping = (t: string) => {
    setToppings(prev => prev.includes(t) ? prev.filter(a => a !== t) : [...prev, t]);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="text-center">
        <h1 className="text-4xl font-serif font-black italic text-brand-brown mb-2 tracking-tight">Create Your Masterpiece</h1>
        <p className="text-brand-brown/60">Build your own sundae step by step 🍨</p>
      </div>

      {/* Progress Stepper */}
      <div className="flex items-center justify-center gap-4 mb-12">
        {[1, 2, 3].map(i => (
          <React.Fragment key={i}>
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-500
                ${step >= i ? 'bg-brand-accent text-white scale-110 shadow-lg' : 'bg-brand-pink text-brand-brown/30'}
              `}
            >
              {i}
            </div>
            {i < 3 && <div className={`w-12 h-1 bg-brand-pink rounded-full transition-all duration-1000 ${step > i ? 'bg-brand-accent' : ''}`} />}
          </React.Fragment>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Preview Container */}
        <section className="bg-white rounded-[40px] p-12 premium-shadow text-center relative overflow-hidden min-h-[500px] flex flex-col items-center justify-center border border-brand-pink/30">
          <div className="absolute inset-0 bg-linear-to-b from-brand-pink/20 to-transparent opacity-50" />
          
          <motion.div 
            key={base}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative z-10"
          >
            {/* Visual Sundae Build */}
            <div className="w-56 h-56 bg-brand-cream rounded-full border-4 border-brand-pink flex items-center justify-center relative shadow-inner overflow-hidden">
               <div className={`w-40 h-40 rounded-full absolute ${
                 base === 'Vanilla' ? 'bg-white' : 
                 base === 'Chocolate' ? 'bg-amber-900' : 
                 base === 'Strawberry' ? 'bg-pink-300' : 'bg-yellow-400'
               } shadow-lg`} />
               
               {/* Toppings Visuals */}
               {toppings.map((t, idx) => (
                 <motion.div
                  key={t}
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="absolute z-20 text-2xl"
                  style={{ 
                    top: `${20 + (idx * 15)}%`, 
                    left: `${30 + (idx * 10)}%`
                  }}
                 >
                   {t === 'Oreo' ? '🍪' : t === 'Nuts' ? '🥜' : t === 'Brownie Chunks' ? '🍫' : t === 'Fruits' ? '🍓' : t === 'Marshmallows' ? '🍡' : '✨'}
                 </motion.div>
               ))}

               {/* Sauce Overlay */}
               <motion.div 
                className={`absolute inset-0 z-30 opacity-40 mix-blend-multiply
                  ${sauce === 'Chocolate' ? 'bg-amber-950' : sauce === 'Caramel' ? 'bg-amber-600' : 'bg-rose-600'}
                `}
               />
            </div>
            
            <motion.div 
              className="mt-12 space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3 className="text-2xl font-serif font-bold italic">{base} Base Sundae</h3>
              <p className="text-sm text-brand-brown/40">With {toppings.length > 0 ? toppings.join(', ') : 'no toppings'} and {sauce} sauce</p>
            </motion.div>
          </motion.div>

          <div className="mt-auto pt-8 flex gap-8 justify-center w-full z-10 border-t border-brand-pink/20">
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-brand-brown/40 block">Price</span>
              <span className="font-bold text-2xl text-brand-accent">${calculatePrice().toFixed(2)}</span>
            </div>
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-brand-brown/40 block">Est. Calories</span>
              <span className="font-bold text-2xl text-brand-brown">{calculateCalories()}</span>
            </div>
          </div>
        </section>

        {/* Selection Container */}
        <section className="bg-brand-cream/30 p-8 rounded-[40px] border border-brand-pink/50 space-y-8 min-h-[500px] flex flex-col">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-serif font-bold italic border-b border-brand-pink/50 pb-4">Step 1: Choose Base Ice Cream</h2>
                <div className="grid grid-cols-2 gap-4">
                  {bases.map(b => (
                    <button
                      key={b}
                      onClick={() => setBase(b)}
                      className={`p-6 rounded-3xl border-2 transition-all font-bold text-lg
                        ${base === b ? 'border-brand-accent bg-white shadow-lg scale-105' : 'border-transparent bg-white/50 text-brand-brown/40 hover:bg-white'}
                      `}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-serif font-bold italic border-b border-brand-pink/50 pb-4">Step 2: Add Your Toppings (+$0.75 each)</h2>
                <div className="grid grid-cols-2 gap-3">
                  {availableToppings.map(t => (
                    <button
                      key={t}
                      onClick={() => toggleTopping(t)}
                      className={`p-4 rounded-2xl border transition-all flex items-center justify-between
                        ${toppings.includes(t) ? 'bg-brand-accent text-white border-brand-accent shadow-md' : 'bg-white border-brand-pink text-brand-brown hover:border-brand-accent'}
                      `}
                    >
                      <span className="font-medium">{t}</span>
                      {toppings.includes(t) && <Trash2 size={16} />}
                    </button>
                  ))}
                </div>
                <div className="bg-brand-pink/20 p-4 rounded-2xl">
                  <p className="text-xs text-brand-brown/60 flex items-center gap-2">
                    <Info size={14} /> Reorder toppings above to change decoration layers (drag to move)
                  </p>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-serif font-bold italic border-b border-brand-pink/50 pb-4">Step 3: Final Drizzle</h2>
                <div className="space-y-4">
                  {sauces.map(s => (
                    <button
                      key={s}
                      onClick={() => setSauce(s)}
                      className={`w-full p-5 rounded-2xl border-2 transition-all font-bold flex items-center justify-between
                        ${sauce === s ? 'border-brand-accent bg-white shadow-md' : 'border-transparent bg-white text-brand-brown/40 hover:bg-brand-pink/20'}
                      `}
                    >
                      <span>{s} Syrup</span>
                      <Sparkles size={20} className={sauce === s ? 'text-brand-gold' : 'text-transparent'} />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-auto pt-8 flex items-center justify-between gap-4">
            {step > 1 ? (
              <button 
                onClick={() => setStep(step - 1)}
                className="flex-1 py-4 px-6 border-2 border-brand-pink rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-brand-pink transition-all"
              >
                <ChevronLeft size={20} /> Back
              </button>
            ) : <div className="flex-1" />}
            
            {step < 3 ? (
              <button 
                onClick={() => setStep(step + 1)}
                className="flex-[2] py-4 px-6 bg-brand-brown text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-black transition-all"
              >
                Next Step <ChevronRight size={20} />
              </button>
            ) : (
              <button 
                onClick={handleComplete}
                className="flex-[2] py-4 px-6 bg-brand-accent text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl hover:scale-105 transition-all"
              >
                Finish & Add <ShoppingBag size={20} />
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
