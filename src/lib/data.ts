import type { Product, Order, User } from './types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Classic Leather Watch',
    description: 'A timeless piece that blends classic design with modern functionality. Perfect for any occasion.',
    price: 249.99,
    imageUrl: 'https://placehold.co/600x400.png',
    category: 'Accessories',
  },
  {
    id: 2,
    name: 'Wireless Bluetooth Headphones',
    description: 'Experience immersive sound with these high-fidelity wireless headphones. Long-lasting battery life.',
    price: 199.99,
    imageUrl: 'https://placehold.co/600x400.png',
    category: 'Electronics',
  },
  {
    id: 3,
    name: 'Minimalist Desk Lamp',
    description: 'Brighten up your workspace with this sleek and modern desk lamp. Adjustable brightness levels.',
    price: 79.99,
    imageUrl: 'https://placehold.co/600x400.png',
    category: 'Home Goods',
  },
  {
    id: 4,
    name: 'Gourmet Coffee Blend',
    description: 'A rich and aromatic blend of premium coffee beans from around the world. Whole bean or ground.',
    price: 24.99,
    imageUrl: 'https://placehold.co/600x400.png',
    category: 'Groceries',
  },
  {
    id: 5,
    name: 'Professional Yoga Mat',
    description: 'Eco-friendly, non-slip yoga mat for a perfect workout. Available in various colors.',
    price: 59.99,
    imageUrl: 'https://placehold.co/600x400.png',
    category: 'Sports',
  },
  {
    id: 6,
    name: 'Hardcover Classic Novel',
    description: 'A beautifully bound edition of a literary classic. A must-have for any book lover.',
    price: 34.99,
    imageUrl: 'https://placehold.co/600x400.png',
    category: 'Books',
  },
  {
    id: 7,
    name: 'Smart Home Hub',
    description: 'Control all your smart devices from one central hub. Voice-activated and easy to set up.',
    price: 129.99,
    imageUrl: 'https://placehold.co/600x400.png',
    category: 'Electronics',
  },
  {
    id: 8,
    name: 'Organic Skincare Set',
    description: 'A complete set of organic skincare products to rejuvenate your skin. For all skin types.',
    price: 89.99,
    imageUrl: 'https://placehold.co/600x400.png',
    category: 'Beauty',
  },
];

export const user: User = {
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  address: '123 Tech Lane, Innovation City, 12345',
  avatarUrl: 'https://placehold.co/100x100.png',
};

export const orders: Order[] = [
  {
    id: 'ORD-001',
    date: '2023-10-15',
    items: [
      { ...products[1], quantity: 1 },
      { ...products[3], quantity: 2 },
    ],
    total: 359.97,
    status: 'Delivered',
  },
  {
    id: 'ORD-002',
    date: '2023-11-01',
    items: [{ ...products[6], quantity: 1 }],
    total: 129.99,
    status: 'Delivered',
  },
  {
    id: 'ORD-003',
    date: '2024-01-20',
    items: [
      { ...products[0], quantity: 1 },
      { ...products[7], quantity: 1 },
    ],
    total: 339.98,
    status: 'Processing',
  },
];
