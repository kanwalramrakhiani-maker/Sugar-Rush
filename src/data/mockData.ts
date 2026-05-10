/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Dessert } from '../types';

export const MOCK_DESSERTS: Dessert[] = [
  {
    id: 'choc-fudge',
    name: 'Chocolate Fudge Cake',
    description: 'Decadent layers of moist chocolate sponge filled with rich fudge frosting.',
    price: 12.99,
    category: 'Cakes & Pastries',
    calories: 450,
    sweetnessMeter: 5,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=400',
    ratings: 4.8,
    reviewCount: 124,
    isBestSeller: true,
    tags: ['Best Seller', 'Rich'],
    ingredients: ['Cocoa', 'Flour', 'Butter', 'Sugar', 'Eggs']
  },
  {
    id: 'gulab-jamun',
    name: 'Gulab Jamun',
    description: 'Soft, melt-in-your-mouth milk solid dumplings soaked in rose-infused sugar syrup.',
    price: 5.49,
    category: 'Traditional Meetha',
    calories: 320,
    sweetnessMeter: 5,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=400',
    ratings: 4.9,
    reviewCount: 312,
    isBestSeller: true,
    tags: ['Traditional', 'Popular'],
    ingredients: ['Khoya', 'Sugar', 'Saffron', 'Rosewater']
  },
  {
    id: 'tiramisu',
    name: 'Classic Tiramisu',
    description: 'Italian coffee-flavored dessert with layers of ladyfingers and mascarpone.',
    price: 8.99,
    category: 'Cold Desserts',
    calories: 380,
    sweetnessMeter: 3,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=400',
    ratings: 4.7,
    reviewCount: 89,
    isBestSeller: false,
    tags: ['Coffee', 'Creamy'],
    ingredients: ['Mascarpone', 'Coffee', 'Ladyfingers', 'Cocoa']
  },
  {
    id: 'lava-cake',
    name: 'Molten Lava Cake',
    description: 'Warm chocolate cake with a gooey, liquid chocolate center.',
    price: 7.99,
    category: 'Hot Desserts',
    calories: 420,
    sweetnessMeter: 4,
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&q=80&w=400',
    ratings: 4.8,
    reviewCount: 204,
    isBestSeller: true,
    tags: ['Hot', 'Gooey'],
    ingredients: ['Dark Chocolate', 'Butter', 'Sugar', 'Eggs']
  },
  {
    id: 'baklava',
    name: 'Pistachio Baklava',
    description: 'Crispy layers of phyllo pastry filled with chopped nuts and honey syrup.',
    price: 6.99,
    category: 'Traditional Meetha',
    calories: 280,
    sweetnessMeter: 4,
    image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&q=80&w=400',
    ratings: 4.6,
    reviewCount: 156,
    isBestSeller: false,
    tags: ['Nutty', 'Crunchy'],
    ingredients: ['Phyllo', 'Pistachios', 'Honey', 'Butter']
  },
  {
    id: 'raspberry-cheesecake',
    name: 'Raspberry Cheesecake',
    description: 'Smooth and creamy cheesecake topped with fresh raspberry coulis.',
    price: 9.49,
    category: 'Cakes & Pastries',
    calories: 350,
    sweetnessMeter: 3,
    image: 'https://images.unsplash.com/photo-1527324688151-0e627063f2b1?auto=format&fit=crop&q=80&w=400',
    ratings: 4.7,
    reviewCount: 98,
    isBestSeller: false,
    tags: ['Fruity', 'Creamy'],
    ingredients: ['Cream Cheese', 'Raspberries', 'Graham Crackers']
  }
];
