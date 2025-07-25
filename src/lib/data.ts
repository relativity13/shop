
import type { Product, OrderItem } from './types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Stearic Acid',
    description: 'Godrej Distric Grade',
    price: 108000,
    unit: 'MT',
    factoryLocation: 'Sector 4, Bawana',
    imageUrl: 'https://placehold.co/600x400.png',
    category: 'Acids',
  },
  {
    id: 2,
    name: 'Sodium Hydroxide (NaOH)',
    description: 'Also known as caustic soda, used in manufacturing of pulp and paper, textiles, and soaps.',
    price: 450.50,
    unit: 'MT',
    factoryLocation: 'Ludwigshafen, DE',
    imageUrl: 'https://placehold.co/600x400.png',
    category: 'Bases',
  },
  {
    id: 3,
    name: 'Ammonia (NH₃)',
    description: 'Anhydrous ammonia for agricultural use as a fertilizer and as a building block for other chemicals.',
    price: 0, // Set to 0 to demonstrate "Ask for Quote"
    unit: 'MT',
    factoryLocation: 'Dammam, SA',
    imageUrl: 'https://placehold.co/600x400.png',
    category: 'Fertilizers',
  },
  {
    id: 4,
    name: 'Methanol (CH₃OH)',
    description: 'A versatile solvent and fuel, also used in the production of formaldehyde and acetic acid.',
    price: 300.75,
    unit: 'MT',
    factoryLocation: 'Shanghai, CN',
    imageUrl: 'https://placehold.co/600x400.png',
    category: 'Solvents',
  },
  {
    id: 5,
    name: 'Propylene Glycol (C₃H₈O₂)',
    description: 'Industrial grade propylene glycol for use as an antifreeze, solvent, and in polymer production.',
    price: 1200.00,
    unit: 'MT',
    factoryLocation: 'Antwerp, BE',
    imageUrl: 'https://placehold.co/600x400.png',
    category: 'Polymers',
  },
  {
    id: 6,
    name: 'Xylene (C₈H₁₀)',
    description: 'A common petrochemical used as a solvent in printing, rubber, and leather industries.',
    price: 950.00,
    unit: 'MT',
    factoryLocation: 'Jurong Island, SG',
    imageUrl: 'https://placehold.co/600x400.png',
    category: 'Solvents',
  },
  {
    id: 7,
    name: 'Titanium Dioxide (TiO₂)',
    description: 'A white pigment used in paints, coatings, plastics, and paper for its brightness and opacity.',
    price: 2500.00,
    unit: 'MT',
    factoryLocation: 'Yanbu, SA',
    imageUrl: 'https://placehold.co/600x400.png',
    category: 'Pigments',
  },
  {
    id: 8,
    name: 'Calcium Chloride (CaCl₂)',
    description: 'Used for de-icing, dust control, and as a brine for refrigeration plants.',
    price: 280.00,
    unit: 'MT',
    factoryLocation: 'Midland, US',
    imageUrl: 'https://placehold.co/600x400.png',
    category: 'Salts',
  },
];


export const orders: {
  id: string;
  items: OrderItem[];
  total: number;
  status: string;
  date: string;
}[] = [
  {
    id: 'ORD001',
    items: [
      { id: 1, name: 'Stearic Acid', quantity: 2, price: 108000, unit: 'MT', description: 'Godrej Distric Grade', factoryLocation: 'Sector 4, Bawana', imageUrl: 'https://placehold.co/600x400.png', category: 'Acids' },
      { id: 2, name: 'Sodium Hydroxide (NaOH)', quantity: 1, price: 450.50, unit: 'MT', description: 'Also known as caustic soda, used in manufacturing of pulp and paper, textiles, and soaps.', factoryLocation: 'Ludwigshafen, DE', imageUrl: 'https://placehold.co/600x400.png', category: 'Bases' }
    ],
    total: 216450.50,
    status: 'Delivered',
    date: '2023-10-15',
  },
  {
    id: 'ORD002',
    items: [
      { id: 4, name: 'Methanol (CH₃OH)', quantity: 5, price: 300.75, unit: 'MT', description: 'A versatile solvent and fuel, also used in the production of formaldehyde and acetic acid.', factoryLocation: 'Shanghai, CN', imageUrl: 'https://placehold.co/600x400.png', category: 'Solvents' }
    ],
    total: 1503.75,
    status: 'Shipped',
    date: '2023-10-20',
  },
];
