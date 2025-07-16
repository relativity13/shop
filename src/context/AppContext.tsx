"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Product } from '@/lib/types';
import { products as initialProducts } from '@/lib/data';

interface AppContextType {
  products: Product[];
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [products] = useState<Product[]>(initialProducts);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const addToWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      if (!prevWishlist.find(item => item.id === product.id)) {
        return [...prevWishlist, product];
      }
      return prevWishlist;
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId));
  };
  
  const isInWishlist = (productId: number) => {
    return wishlist.some(item => item.id === productId);
  };

  const value = {
    products,
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
