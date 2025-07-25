
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { Product, OrderItem, WishlistItem } from '@/lib/types';
// import { products as initialProducts } from '@/lib/data';

interface AppContextType {
  products: Product[];
  wishlist: WishlistItem[];
  cart: OrderItem[];
  addToWishlist: (product: Product, quantity: number) => void;
  removeFromWishlist: (productId: number | string) => void;
  isInWishlist: (productId: number | string) => boolean;
  updateWishlistItemQuantity: (productId: number | string, quantity: number) => void;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number | string) => void;
  updateCartItemQuantity: (productId: number | string, quantity: number) => void;
  getCartTotal: () => number;
  clearCart: () => void;
  addWishlistToCart: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const WISHLIST_STORAGE_KEY = 'hike-wishlist';

export const AppProvider = ({ children, initialProducts = [] }: { children: ReactNode, initialProducts?: Product[] }) => {
  const [products] = useState<Product[]>(initialProducts);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [cart, setCart] = useState<OrderItem[]>([]);
  
  // Load wishlist from localStorage on initial render
  useEffect(() => {
    try {
      const storedWishlist = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    } catch (error) {
      console.error("Failed to parse wishlist from localStorage", error);
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (error) {
      console.error("Failed to save wishlist to localStorage", error);
    }
  }, [wishlist]);


  const addToWishlist = (product: Product, quantity: number) => {
    if (!product.price) return;
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
      return [...prevWishlist, { ...product, quantity, price: product.price }];
    });
  };

  const removeFromWishlist = (productId: number | string) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId));
    console.log("Removed from wishlist");
  };
  
  const isInWishlist = (productId: number | string) => {
    return wishlist.some(item => item.id === productId);
  };

  const updateWishlistItemQuantity = (productId: number | string, quantity: number) => {
    if (quantity <= 0) {
      removeFromWishlist(productId);
      return;
    }
    setWishlist((prevWishlist) =>
      prevWishlist.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const addToCart = (product: Product, quantity: number) => {
    if (!product.price) return;
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
      return [...prevCart, { ...product, quantity, price: product.price }];
    });
    console.log(`Added to cart: ${quantity} ${product.unit}(s) of ${product.name}`);
  };

  const addWishlistToCart = () => {
    wishlist.forEach(item => {
      addToCart(item, item.quantity);
    });
    console.log("Added all wishlist items to cart.");
  };

  const removeFromCart = (productId: number | string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    console.log("Removed from cart");
  };

  const updateCartItemQuantity = (productId: number | string, quantity: number) => {
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
