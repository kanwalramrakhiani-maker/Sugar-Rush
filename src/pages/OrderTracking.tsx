/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Clock, MapPin, Phone, MessageSquare, Package, Truck, Utensils, Star } from 'lucide-react';

export default function OrderTracking() {
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: 'Order Received', icon: CheckCircle2, desc: 'We have received your sweet request!' },
    { label: 'Mixing', icon: Utensils, desc: 'Chef is preparing the premium mix.' },
    { label: 'Baking/Preparing', icon: Clock, desc: 'In the oven or being chilled to perfection.' },
    { label: 'Decorating', icon: Package, desc: 'Adding the final artistic touches.' },
    { label: 'Packed', icon: Package, desc: 'Wrapped with love in premium packaging.' },
    { label: 'Out for Delivery', icon: Truck, desc: 'The Sugar Rush rider is on the way!' },
    { label: 'Delivered', icon: Star, desc: 'Time to enjoy your dessert! 🍰' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 5000);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-serif font-bold italic text-brand-brown">Tracking Order #{id?.toUpperCase()}</h1>
        <p className="text-brand-brown/60">Estimated arrival in <span className="text-brand-accent font-bold">24 Minutes</span></p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 items-start">
        {/* Left Side: Steps */}
        <section className="md:col-span-2 bg-white rounded-[40px] p-8 premium-shadow border border-brand-pink/20 space-y-8">
          <div className="relative">
            {/* Connector Line */}
            <div className="absolute left-[27px] top-4 bottom-4 w-1 bg-brand-pink/30 rounded-full" />
            <div 
              className="absolute left-[27px] top-4 w-1 bg-brand-accent rounded-full transition-all duration-1000"
              style={{ height: `${(currentStep / (steps.length - 1)) * 100}%` }}
            />

            <div className="space-y-10 relative">
              {steps.map((step, idx) => (
                <div key={idx} className="flex gap-6 items-start">
                  <div 
                    className={`
                      w-14 h-14 rounded-full flex items-center justify-center z-10 transition-all duration-500
                      ${idx <= currentStep ? 'bg-brand-accent text-white scale-110 shadow-lg' : 'bg-brand-pink text-brand-brown/30'}
                    `}
                  >
                    <step.icon size={24} />
                  </div>
                  <div className={`pt-2 transition-all duration-500 ${idx <= currentStep ? 'opacity-100 translate-x-2' : 'opacity-40'}`}>
                    <h3 className="font-bold text-lg">{step.label}</h3>
                    <p className="text-sm text-brand-brown/60">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Right Side: Rider and Map mockup */}
        <section className="space-y-8">
          {/* Rider Info */}
          <div className="bg-brand-brown text-white p-8 rounded-[40px] premium-shadow border border-white/10 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-brand-accent flex items-center justify-center p-1">
                <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100" className="w-full h-full object-cover rounded-xl" alt="Rider" />
              </div>
              <div>
                <h4 className="font-bold">Ahmed K.</h4>
                <div className="flex gap-1 text-brand-gold">
                  {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="currentColor" />)}
                </div>
                <span className="text-[10px] opacity-60">Sugar Rush Elite Rider</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="flex-1 bg-white/10 p-4 rounded-2xl hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                <Phone size={18} />
              </button>
              <button className="flex-1 bg-white/10 p-4 rounded-2xl hover:bg-white/20 transition-all flex items-center justify-center gap-2 text-brand-accent font-bold">
                <MessageSquare size={18} /> Chat
              </button>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-white h-80 rounded-[40px] premium-shadow border border-brand-pink relative overflow-hidden group">
            <div className="absolute inset-0 bg-brand-pink/10 animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center p-8 text-center italic text-brand-brown/40">
              <div className="space-y-4">
                <MapPin size={40} className="mx-auto text-brand-accent animate-bounce" />
                <p className="text-sm font-bold">Real-time GPS Tracking <br /> Active</p>
              </div>
            </div>
            
            {/* Moving Rider Visual */}
            <motion.div 
               animate={{ x: [0, 50, -30, 0], y: [0, 20, -10, 0] }}
               transition={{ duration: 10, repeat: Infinity }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-brand-accent text-white rounded-full premium-shadow border-2 border-white"
            >
              <Truck size={20} />
            </motion.div>
          </div>

          <Link 
            to="/menu" 
            className="w-full bg-white border border-brand-pink text-brand-brown py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-brand-pink transition-all"
          >
            Order More Sweets?
          </Link>
        </section>
      </div>
    </div>
  );
}
