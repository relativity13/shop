
import type { Product, OrderItem } from './types';

export const companyInfo = {
  name: 'HIKE CORPORATION',
  logo: '/logo.png',
  tagline: 'Your Trusted Partner in Excellence',
  about: "At HIKE CORPORATION, we're dedicated to supplying high-quality products with a seamless procurement experience. Our mission is to combine quality, convenience, and cutting-edge technology to redefine distribution.",
  address: 'G-41, Sector-4, Bawana Industrial Area,DSIIDC, Delhi-110039',
  phoneNumber: '+91-8920912782',
  whatsappNumber: '918920912782',
  email: 'hikecorp@gmail.com',
  website: 'www.hikecorporation.in',
};

export const productCategories: string[] = [
  'Acids',
  'PVC Resin',
  'Phthalate',
  'Minerals',
  'Polymers',
  'Pigments',
  'Salts',
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Stearic Acid',
    description: 'Godrej Distric Grade, Packaging-25Kg Bags',
    price: 109,
    unit: 'KG',
    moq: '500 KG',
    factoryLocation: 'Bawana, Delhi',
    category: 'Acids',
  },
  {
    id: 2,
    name: 'PVC Resin',
    description: 'CGPC H66 Packaging- 25Kg Paper Bag',
    price: { min: 69, max: 75 },
    unit: 'MT',
    moq: '1 MT',
    factoryLocation: 'Bawana, Delhi',
    category: 'PVC Resin',
  },
  {
    id: 3,
    name: 'DMP',
    description: 'KLG Group- Dimethyl Phthalate, 250 KG Sealed Drum',
    //price : 120,
    unit: 'KG',
    moq: '250 KG',
    factoryLocation: 'Bawana, Delhi',
    category: 'Phthalate',
  },
  {
    id: 4,
    name: 'Talcum Powder',
    description: 'Golcha- Rajat Grade. Pakaging-50Kg Bags, Tags: soapstone.',
    price: 10,
    unit: 'KG',
    moq: '100 KG',
    factoryLocation: 'Bawana, Delhi',
   
    category: 'Minerals',

  },
  
 /* {
    id: 5,
    name: 'Propylene Glycol (C₃H₈O₂)',
    description: 'Industrial grade propylene glycol for use as an antifreeze, solvent, and in polymer production.',
    price: { min: 290, max: 310 },
    unit: 'MT',
    moq: '1 MT',
    factoryLocation: 'Antwerp, BE',
   
    category: 'Polymers',
  },
  {
    id: 6,
    name: 'Xylene (C₈H₁₀)',
    description: 'A common petrochemical used as a solvent in printing, rubber, and leather industries.',
    price: 950.00,
    unit: 'MT',
    moq: '1 MT',
    factoryLocation: 'Jurong Island, SG',
    
    category: 'Solvents',
  },
  {
    id: 7,
    name: 'Titanium Dioxide (TiO₂)',
    description: 'A white pigment used in paints, coatings, plastics, and paper for its brightness and opacity.',
    price: 2500.00,
    unit: 'MT',
    moq: '1 MT',
    factoryLocation: 'Yanbu, SA',
 
    category: 'Pigments',
  },
  {
    id: 8,
    name: 'Calcium Chloride (CaCl₂)',
   description: 'Used for de-icing, dust control, and as a brine for refrigeration plants.',
   price: 280.00,
   unit: 'MT',
   moq: '5 MT',
    factoryLocation: 'Midland, US',
    
    category: 'Salts',
  },*/
];

;
