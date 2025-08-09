
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { Product, OrderItem, WishlistItem } from '@/lib/types';
import { companyInfo } from '@/lib/data';
import { formatIndianCurrency } from '@/lib/utils';
// import { products as initialProducts } from '@/lib/data';

type ActionType = 'order' | 'price';
type RequestType = 'sample' | 'new_product';

interface AppContextType {
  products: Product[];
  wishlist: WishlistItem[];
  cart: OrderItem[];
  addToWishlist: (product: Product, quantity: number) => void;
  removeFromWishlist: (productId: number | string) => void;
  isInWishlist: (productId: number | string) => boolean;
  updateWishlistItemQuantity: (productId: number | string, quantity: number) => void;
  addToCart: (product: Product | WishlistItem, quantity: number) => void;
  removeFromCart: (productId: number | string) => void;
  updateCartItemQuantity: (productId: number | string, quantity: number) => void;
  getCartTotal: () => number;
  clearCart: () => void;
  addWishlistToCart: () => void;
  openWhatsApp: (product: Product | WishlistItem, quantity: number, type: ActionType) => void;
  openWhatsAppForWishlist: () => void;
  openWhatsAppForRequest: (requestType: RequestType, productName: string, details: string) => void;
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
    let price: number | undefined;
    if (typeof product.price === 'number') {
        price = product.price;
    } else {
        price = undefined; // No price or price range
    }

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
      const wishlistItem: WishlistItem = {
        ...product,
        quantity,
        price,
      };

      return [...prevWishlist, wishlistItem];
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

  const addToCart = (product: Product | WishlistItem, quantity: number) => {
    // A product must have a numeric price to be added to the cart.
    if (typeof product.price !== 'number') {
        console.error("Cannot add product with a price range or no price to the cart directly.");
        return;
    }

    if (quantity <= 0) {
      console.error("Invalid Quantity: Please enter a quantity greater than 0.");
      return;
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      
      const cartItem: OrderItem = {
          ...product,
          price: product.price as number, // We've already checked this, so we can assert the type
          quantity: quantity
      };

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      
      console.log(`Added to cart: ${quantity} ${product.unit}(s) of ${product.name}`);
      return [...prevCart, cartItem];
    });
  };

  const addWishlistToCart = () => {
    wishlist.forEach(item => {
      // Only add items from wishlist that have a price
      if (typeof item.price === 'number' && item.price > 0) {
        addToCart(item, item.quantity);
      }
    });
    console.log("Added all applicable wishlist items to cart.");
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

  const openWhatsApp = (product: Product | WishlistItem, quantity: number, type: ActionType) => {
     let message = '';
     if (type === 'order') {
        if (typeof product.price !== 'number') return;
        message = `*New Order Request*\n\nI would like to order the following item:\n\n- *Product:* ${product.name}\n- *Quantity:* ${quantity} ${product.unit}\n- *Price per unit:* ₹${formatIndianCurrency(product.price)}\n\nThank you!`;
    } else if (type === 'price') {
        message = `*Price Needed*\n\nI'm interested in the following product:\n\n- *Product:* ${product.name}\n- *Description:* ${product.description}\n- *Quantity:* ${quantity} ${product.unit}\n\nPlease provide a price. Thank you!`;
    }
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${companyInfo.whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  }

  const openWhatsAppForWishlist = () => {
    if (wishlist.length === 0) return;

    let message = '*Wishlist Request*\n\nI would like to inquire about the following items from my wishlist:\n';

    const orderItems = wishlist.filter(item => typeof item.price === 'number');
    const priceRequestItems = wishlist.filter(item => typeof item.price !== 'number');

    if (orderItems.length > 0) {
      message += '\n*Order Items:*\n';
      orderItems.forEach(item => {
        message += `- *Product:* ${item.name}\n  - *Quantity:* ${item.quantity} ${item.unit}\n  - *Price:* ₹${formatIndianCurrency(item.price!)} / ${item.unit}\n`;
      });
    }

    if (priceRequestItems.length > 0) {
      message += '\n*Price Request Items:*\n';
      priceRequestItems.forEach(item => {
        message += `- *Product:* ${item.name}\n  - *Quantity:* ${item.quantity} ${item.unit}\n`;
      });
    }

    message += '\nThank you!';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${companyInfo.whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const openWhatsAppForRequest = (requestType: RequestType, productName: string, details: string) => {
    let message = '';
    if (requestType === 'sample') {
      message = `*Sample Request*\n\nI would like to request a sample for the following product:\n\n- *Product Name:* ${productName}`;
    } else {
      message = `*New Product Request*\n\nI am looking for a product that is not in the catalog:\n\n- *Requested Product:* ${productName}`;
    }

    if (details) {
      message += `\n- *Additional Details:* ${details}`;
    }

    message += '\n\nThank you!';

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${companyInfo.whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };


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
    openWhatsApp,
    openWhatsAppForWishlist,
    openWhatsAppForRequest,
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
