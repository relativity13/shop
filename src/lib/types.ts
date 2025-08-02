
export interface Product {
  id: number | string;
  name: string;
  description: string;
  price?: number | { min: number; max: number };
  unit: string;
  factoryLocation: string;
  category: string;
  moq?: string;
}

export interface WishlistItem extends Product {
  quantity: number;
  price: number; // For wishlist, we'll store a single price, perhaps the min for ranged items
}


export interface OrderItem extends Product {
  quantity: number;
  price: number;
}
