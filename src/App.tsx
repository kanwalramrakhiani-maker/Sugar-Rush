/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import MenuList from './pages/MenuList';
import DessertDetail from './pages/DessertDetail';
import CustomSundae from './pages/CustomSundae';
import Cart from './pages/Cart';
import OrderTracking from './pages/OrderTracking';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen pb-20 md:pb-0 md:pt-20">
      <Navbar />
      
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="container mx-auto px-4 py-6"
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<MenuList />} />
            <Route path="/dessert/:id" element={<DessertDetail />} />
            <Route path="/custom-sundae" element={<CustomSundae />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/track/:id" element={<OrderTracking />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </motion.main>
      </AnimatePresence>

      <BottomNav />
    </div>
  );
}
