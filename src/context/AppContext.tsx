"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Product, OrderItem } from '@/lib/types';
import { products as initialProducts } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

interface AppContextType {
  products: Product[];
  wishlist: Product[];
  cart: OrderItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  addToCart: (product: Product) => void;
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
  const { toast } = useToast();

  const addToWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      if (!prevWishlist.find(item => item.id === product.id)) {
        toast({ title: "Added to wishlist", description: `${product.name} has been added to your wishlist.` });
        return [...prevWishlist, product];
      }
      return prevWishlist;
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId));
    toast({ title: "Removed from wishlist" });
  };
  
  const isInWishlist = (productId: number) => {
    return wishlist.some(item => item.id === productId);
  };

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    toast({ title: "Added to cart", description: `${product.name} has been added to your cart.` });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    toast({ title: "Removed from cart" });
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
