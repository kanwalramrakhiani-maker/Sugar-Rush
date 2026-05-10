/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { LayoutDashboard, ShoppingBag, Users, FileText, Settings, Plus, Download, Filter, TrendingUp, DollarSign, Activity } from 'lucide-react';

const data = [
  { name: 'Mon', revenue: 4000, orders: 240 },
  { name: 'Tue', revenue: 3000, orders: 198 },
  { name: 'Wed', revenue: 2000, orders: 980 },
  { name: 'Thu', revenue: 2780, orders: 3908 },
  { name: 'Fri', revenue: 1890, orders: 4800 },
  { name: 'Sat', revenue: 2390, orders: 3800 },
  { name: 'Sun', revenue: 3490, orders: 4300 },
];

const COLORS = ['#f06292', '#3e2723', '#d4af37', '#fce4ec'];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Revenue', value: '$24,450', icon: DollarSign, trend: '+12%', color: 'text-green-500' },
    { label: 'Total Orders', value: '1,204', icon: ShoppingBag, trend: '+5%', color: 'text-brand-accent' },
    { label: 'Active Customers', value: '840', icon: Users, trend: '+18%', color: 'text-blue-500' },
    { label: 'Avg Order Value', value: '$20.30', icon: Activity, trend: '-2%', color: 'text-brand-gold' },
  ];

  return (
    <div className="flex min-h-[calc(100vh-160px)] gap-8">
      {/* Admin Sidebar */}
      <aside className="w-64 space-y-6 hidden lg:block">
        <div className="bg-white p-6 rounded-[32px] premium-shadow border border-brand-pink/20 space-y-2">
          {[
            { id: 'overview', name: 'Dashboard', icon: LayoutDashboard },
            { id: 'orders', name: 'Orders', icon: ShoppingBag },
            { id: 'menu', name: 'Menu Items', icon: FileText },
            { id: 'users', name: 'Customers', icon: Users },
            { id: 'settings', name: 'Settings', icon: Settings },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 p-4 rounded-xl font-bold transition-all
                ${activeTab === item.id ? 'bg-brand-accent text-white shadow-lg' : 'text-brand-brown/50 hover:bg-brand-pink hover:text-brand-brown'}
              `}
            >
              <item.icon size={20} />
              {item.name}
            </button>
          ))}
        </div>

        <div className="bg-brand-brown text-white p-6 rounded-[32px] premium-shadow space-y-4">
          <h4 className="font-serif font-bold italic">Need Help?</h4>
          <p className="text-xs opacity-60">Sugar Rush admin support is available 24/7 for you.</p>
          <button className="w-full bg-white/10 p-3 rounded-xl text-xs font-bold hover:bg-white/20 transition-all">Support Desk</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold italic text-brand-brown capitalize">{activeTab} Overview</h1>
            <p className="text-sm text-brand-brown/40 font-medium">Welcome back, Admin! Here's what's happening. ✨</p>
          </div>
          <div className="flex gap-3">
             <button className="p-3 bg-white border border-brand-pink rounded-xl text-brand-brown hover:bg-brand-pink transition-all">
               <Download size={20} />
             </button>
             <button className="flex items-center gap-2 bg-brand-accent text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-brown transition-all shadow-lg">
               <Plus size={20} /> Add Item
             </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(stat => (
            <div key={stat.label} className="bg-white p-6 rounded-[32px] premium-shadow border border-brand-pink/20 space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-brand-cream rounded-xl text-brand-accent">
                   <stat.icon size={24} />
                </div>
                <span className={`text-xs font-bold ${stat.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.trend}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-brand-brown/40 block">{stat.label}</span>
                <span className="text-2xl font-black font-serif italic text-brand-brown">{stat.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white p-8 rounded-[40px] premium-shadow border border-brand-pink/20 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-xl italic flex items-center gap-2">
                <TrendingUp className="text-brand-accent" /> Revenue Analytics
              </h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-brand-pink/20 text-brand-accent text-xs font-bold rounded-lg border border-brand-pink">Weekly</button>
                <button className="px-3 py-1 text-xs font-bold rounded-lg text-brand-brown/40">Monthly</button>
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#fce4ec" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#3e272380' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#3e272380' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="#f06292" strokeWidth={4} dot={{ r: 4, fill: '#f06292' }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-brand-brown text-white p-8 rounded-[40px] premium-shadow space-y-6">
            <h3 className="font-serif font-bold text-xl italic">Top Categories</h3>
            <div className="h-48 w-full">
               <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Cakes', value: 400 },
                      { name: 'Shakes', value: 300 },
                      { name: 'Warm', value: 300 },
                    ]}
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Cakes & Pastries', value: '45%', color: 'bg-brand-accent' },
                { name: 'Traditional Meetha', value: '30%', color: 'bg-white/20' },
                { name: 'Others', value: '25%', color: 'bg-brand-gold' },
              ].map(item => (
                <div key={item.name} className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span>{item.name}</span>
                    <span className="opacity-60">{item.value}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className={`${item.color} h-full`} style={{ width: item.value }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Orders Table Recap */}
        <div className="bg-white p-8 rounded-[40px] premium-shadow border border-brand-pink/20 space-y-6">
          <div className="flex items-center justify-between">
             <h3 className="font-serif font-bold text-xl italic">Recent Orders</h3>
             <button className="flex items-center gap-2 text-brand-accent font-bold text-sm">
               <Filter size={16} /> Filter
             </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-brand-pink/30">
                  <th className="pb-4 font-serif italic font-bold text-brand-brown">Order ID</th>
                  <th className="pb-4 font-serif italic font-bold text-brand-brown">Customer</th>
                  <th className="pb-4 font-serif italic font-bold text-brand-brown">Status</th>
                  <th className="pb-4 font-serif italic font-bold text-brand-brown">Total</th>
                  <th className="pb-4 font-serif italic font-bold text-brand-brown text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-pink/10">
                {[
                  { id: '#SR1023', user: 'Kanwal R.', status: 'Mixing', total: '$45.20' },
                  { id: '#SR1024', user: 'Zaid A.', status: 'Delivered', total: '$12.50' },
                  { id: '#SR1025', user: 'Maria M.', status: 'Received', total: '$89.00' },
                ].map((row) => (
                  <tr key={row.id} className="group hover:bg-brand-pink/5 transition-colors">
                    <td className="py-4 font-bold text-sm">{row.id}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-brand-cream border border-brand-pink flex items-center justify-center text-[10px] font-bold">
                          {row.user[0]}
                        </div>
                        <span className="text-sm font-medium">{row.user}</span>
                      </div>
                    </td>
                    <td className="py-4">
                       <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest
                        ${row.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-brand-pink text-brand-accent'}
                       `}>
                         {row.status}
                       </span>
                    </td>
                    <td className="py-4 font-bold text-sm">{row.total}</td>
                    <td className="py-4 text-right">
                       <button className="text-brand-brown/30 hover:text-brand-accent font-bold text-xs uppercase underline">Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
