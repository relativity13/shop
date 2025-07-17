
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Product, OrderItem, WishlistItem } from '@/lib/types';
import { products as initialProducts } from '@/lib/data';

interface AppContextType {
  products: Product[];
  wishlist: WishlistItem[];
  cart: OrderItem[];
  addToWishlist: (product: Product, quantity: number) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  updateWishlistItemQuantity: (productId: number, quantity: number) => void;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  getCartTotal: () => number;
  clearCart: () => void;
  addWishlistToCart: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [products] = useState<Product[]>(initialProducts);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [cart, setCart] = useState<OrderItem[]>([]);

  const addToWishlist = (product: Product, quantity: number) => {
    if (quantity <= 0) {
      console.error("Invalid Quantity: Please enter a quantity greater than 0.");
      return;
    }
    setWishlist((prevWishlist) => {
      const existingItem = prevWishlist.find(item => item.id === product.id);
      if (existingItem) {
        return prevWishlist.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      console.log(`Added to wishlist: ${product.name} with quantity ${quantity}`);
      return [...prevWishlist, { ...product, quantity }];
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId));
    console.log("Removed from wishlist");
  };
  
  const isInWishlist = (productId: number) => {
    return wishlist.some(item => item.id === productId);
  };

  const updateWishlistItemQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromWishlist(productId);
      return;
    }
    setWishlist((prevWishlist) =>
      prevWishlist.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
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

  const addWishlistToCart = () => {
    wishlist.forEach(item => {
      addToCart(item, item.quantity);
    });
    console.log("Added all wishlist items to cart.");
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
    updateWishlistItemQuantity,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    getCartTotal,
    clearCart,
    addWishlistToCart,
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
