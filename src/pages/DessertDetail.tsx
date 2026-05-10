/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Minus, Plus, ShoppingBag, Heart, Star, Clock, Info, ArrowLeft, MessageSquare, Flame } from 'lucide-react';
import { MOCK_DESSERTS } from '../data/mockData';
import { useCart } from '../context/CartContext';

export default function DessertDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const dessert = MOCK_DESSERTS.find(d => d.id === id);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('Regular');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [customMessage, setCustomMessage] = useState('');

  if (!dessert) return <div>Dessert not found</div>;

  const addOns = [
    { name: 'Extra Chocolate Sauce', price: 1.5 },
    { name: 'Crushed Nuts', price: 1.0 },
    { name: 'Sprinkles', price: 0.5 },
    { name: 'Whipped Cream', price: 1.2 },
    { name: 'Extra Scoop', price: 2.5 },
  ];

  const totalPrice = (dessert.price + selectedAddOns.reduce((acc, name) => acc + (addOns.find(a => a.name === name)?.price || 0), 0)) * quantity;

  const toggleAddOn = (name: string) => {
    setSelectedAddOns(prev => prev.includes(name) ? prev.filter(a => a !== name) : [...prev, name]);
  };

  const handleAddToCart = () => {
    addToCart({
      id: `${dessert.id}-${Date.now()}`,
      dessertId: dessert.id,
      name: dessert.name,
      price: totalPrice / quantity,
      quantity,
      image: dessert.image,
      customization: {
        size: selectedSize,
        addOns: selectedAddOns,
        customMessage
      }
    });
    navigate('/cart');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-brand-brown/40 hover:text-brand-pink transition-all group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Menu
      </button>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* Gallery Section */}
        <section className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-square rounded-[3rem] overflow-hidden premium-shadow relative shadow-2xl"
          >
            <img src={dessert.image} alt={dessert.name} className="w-full h-full object-cover" />
            <div className="absolute top-8 right-8">
              <button className="w-14 h-14 bg-white/90 backdrop-blur-md rounded-full text-brand-pink hover:bg-brand-pink hover:text-white transition-all shadow-2xl flex items-center justify-center">
                <Heart size={24} />
              </button>
            </div>
            {dessert.isBestSeller && (
              <div className="absolute top-8 left-8 bg-brand-gold text-black px-5 py-2 rounded-full text-[10px] font-black flex items-center gap-2 uppercase tracking-widest shadow-2xl">
                <Flame size={16} fill="currentColor" /> TRENDING NOW
              </div>
            )}
          </motion.div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-square rounded-[1.5rem] overflow-hidden cursor-pointer hover:ring-4 ring-brand-pink/20 transition-all ring-offset-2 premium-shadow">
                <img src={dessert.image} alt="preview" className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </section>

        {/* Info Section */}
        <section className="space-y-10">
          <div>
            <div className="flex items-center gap-3 text-brand-pink font-black text-[10px] uppercase tracking-widest mb-4">
              <div className="flex items-center gap-1">
                <Star size={14} fill="currentColor" className="text-brand-gold" />
                <span className="italic">{dessert.ratings} ({dessert.reviewCount})</span>
              </div>
              <span className="text-brand-brown/10">•</span>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>ASAP DELIVERY</span>
              </div>
            </div>
            <h1 className="text-6xl font-serif font-black italic text-brand-brown mb-6 leading-tight tracking-tighter">{dessert.name}</h1>
            <p className="text-brand-brown/50 font-medium italic leading-relaxed text-lg">{dessert.description}</p>
          </div>

          <div className="grid grid-cols-3 gap-6 bg-brand-light-pink/30 p-8 rounded-[2.5rem] border border-pink-50">
            <div className="text-center">
              <span className="text-[10px] uppercase font-black tracking-widest text-brand-brown/20 block mb-2">Energy</span>
              <span className="font-serif italic font-black text-2xl tracking-tight text-brand-pink">{dessert.calories} kcal</span>
            </div>
            <div className="text-center border-x border-brand-pink/10">
              <span className="text-[10px] uppercase font-black tracking-widest text-brand-brown/20 block mb-2">Sweetness</span>
              <div className="flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map(v => (
                  <div key={v} className={`w-3 h-3 rounded-full ${v <= dessert.sweetnessMeter ? 'bg-brand-pink' : 'bg-brand-pink/20'}`} />
                ))}
              </div>
            </div>
            <div className="text-center">
              <span className="text-[10px] uppercase font-black tracking-widest text-brand-brown/20 block mb-2">Serving</span>
              <span className="font-serif italic font-black text-2xl tracking-tight text-brand-pink">Boutique</span>
            </div>
          </div>

          {/* Customization */}
          <div className="space-y-10">
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-brand-brown/60 mb-4 flex items-center gap-2">Portion Size <Info size={14} className="opacity-20" /></h3>
              <div className="flex gap-4">
                {['Small', 'Regular', 'Large'].map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`
                      flex-1 py-4 rounded-3xl border-2 text-xs font-black uppercase tracking-widest transition-all duration-500
                      ${selectedSize === size ? 'border-brand-pink bg-brand-light-pink text-brand-pink shadow-xl' : 'border-pink-50 text-brand-brown/20 hover:border-brand-pink/30'}
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-brand-brown/60 mb-4">Garnish & Extras</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {addOns.map(addon => (
                  <button
                    key={addon.name}
                    onClick={() => toggleAddOn(addon.name)}
                    className={`
                      flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-300
                      ${selectedAddOns.includes(addon.name) ? 'border-brand-pink bg-brand-light-pink shadow-md' : 'border-pink-50 bg-white hover:border-brand-pink/20'}
                    `}
                  >
                    <span className={`text-[10px] font-black uppercase tracking-widest ${selectedAddOns.includes(addon.name) ? 'text-brand-pink' : 'text-brand-brown/40'}`}>{addon.name}</span>
                    <span className="text-brand-brown font-bold text-[10px] italic">${addon.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {dessert.category === 'Cakes & Pastries' && (
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-brand-brown/60 mb-3 flex items-center gap-2">Calligraphy Message <MessageSquare size={14} className="opacity-20" /></h3>
                <textarea
                  placeholder="Written with edible gold dust..."
                  className="w-full bg-brand-cream border border-pink-100 rounded-[2rem] p-6 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-brand-pink/5 focus:border-brand-pink transition-all h-32 resize-none italic"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="bg-white rounded-[3rem] p-8 premium-shadow border border-pink-50 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 mt-12">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-brown/30 mb-1">Price per share</span>
              <span className="text-4xl font-serif font-black italic text-brand-brown tracking-tight underline decoration-brand-pink decoration-4 underline-offset-4">${totalPrice.toFixed(2)}</span>
            </div>
            
            <div className="flex items-center gap-6 w-full md:w-auto">
              <div className="flex items-center gap-6 bg-brand-cream rounded-full px-5 py-3 border border-pink-100">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-brand-pink hover:scale-150 transition-transform"
                >
                  <Minus size={20} />
                </button>
                <span className="text-xl font-black w-8 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-brand-pink hover:scale-150 transition-transform"
                >
                  <Plus size={20} />
                </button>
              </div>

              <button 
                onClick={handleAddToCart}
                className="flex-1 md:flex-none bg-brand-brown text-white px-10 py-5 rounded-full font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-brand-pink transition-all duration-500 shadow-2xl hover:scale-105 active:scale-95 group"
              >
                ADD TO SUGAR BAG <ShoppingBag size={20} className="group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Reviews */}
      <section className="pt-20">
        <div className="text-center mb-16">
          <span className="text-[10px] bg-brand-pink/10 text-brand-pink font-black px-3 py-1 rounded-sm uppercase tracking-widest mb-4 inline-block">Appreciations</span>
          <h2 className="text-5xl font-serif font-black italic tracking-tighter">Dessert Diaries</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          {[1, 2].map(r => (
            <div key={r} className="bg-white p-12 rounded-[3.5rem] premium-shadow border border-pink-50 relative group hover:border-brand-pink/30 transition-all duration-700">
              <div className="absolute top-10 right-10 flex gap-1 text-brand-gold">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill="currentColor" />)}
              </div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-brand-light-pink flex items-center justify-center text-brand-pink text-xl font-black shadow-xl">
                  {r === 1 ? 'JD' : 'SM'}
                </div>
                <div>
                  <h4 className="text-lg font-black italic tracking-tight">{r === 1 ? 'Ayesha Khan' : 'Sarah Miller'}</h4>
                  <span className="text-[10px] text-brand-brown/30 font-black uppercase tracking-widest italic leading-none">Sweet Enthusiast</span>
                </div>
              </div>
              <p className="text-lg text-brand-brown/60 leading-relaxed font-serif italic italic font-medium">
                "{r === 1 ? 'The harmony of flavors is simply unparalleled. The Ras Malai Cheesecake is a literal religious experience!' : 'Sugar Rush has set a new benchmark for luxury desserts. The delivery was impeccable and the dessert was perfection.'}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended */}
      <section className="pt-24">
        <div className="flex items-end justify-between mb-12 px-4">
          <div>
            <span className="text-[10px] text-brand-pink font-black uppercase tracking-widest mb-2 block">Curated Just For You</span>
            <h2 className="text-4xl font-serif font-black italic tracking-tighter">Boutique Pairings</h2>
          </div>
          <Link to="/menu" className="text-[10px] font-black uppercase tracking-widest text-brand-pink hover:underline underline-offset-8 decoration-2 mb-2">View Library</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {MOCK_DESSERTS.filter(d => d.id !== id).slice(0, 4).map(item => (
            <Link key={item.id} to={`/dessert/${item.id}`} className="group space-y-4 px-2">
              <div className="aspect-square rounded-[2rem] overflow-hidden premium-shadow relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
              </div>
              <div>
                <h4 className="text-lg font-black font-serif italic tracking-tight group-hover:text-brand-pink transition-colors">{item.name}</h4>
                <p className="text-brand-brown/40 font-black text-[10px] italic underline underline-offset-4 decoration-brand-pink/30 uppercase tracking-widest">${item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
