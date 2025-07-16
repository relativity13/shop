"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Product, OrderItem } from '@/lib/types';
import { products as initialProducts } from '@/lib/data';

interface AppContextType {
  products: Product[];
  wishlist: Product[];
  cart: OrderItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  getCartTotal: () => number;
  clearCart: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [products] = useState<Product[]>(initialProducts);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [cart, setCart] = useState<OrderItem[]>([]);

  const addToWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      if (!prevWishlist.find(item => item.id === product.id)) {
        console.log(`Added to wishlist: ${product.name}`);
        return [...prevWishlist, product];
      }
      return prevWishlist;
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId));
    console.log("Removed from wishlist");
  };
  
  const isInWishlist = (productId: number) => {
    return wishlist.some(item => item.id === productId);
  };

  const addToCart = (product: Product, quantity: number) => {
    if (quantity <= 0) {
      console.error("Invalid Quantity: Please enter a quantity greater than 0.");
      return;
    }
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    console.log(`Added to cart: ${quantity} ${product.unit}(s) of ${product.name}`);
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    console.log("Removed from cart");
  };

  const updateCartItemQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };
  
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const clearCart = () => {
    setCart([]);
  }

  const value = {
    products,
    wishlist,
    cart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    getCartTotal,
    clearCart
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
