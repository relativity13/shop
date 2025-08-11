
export interface Product {
  id: number | string;
  name: string;
  description: string;
  price?: number | { min: number; max: number };
  unit: string;
  factoryLocation: string;
  category: string;
  moq?: string;
  brand?: string;
  grade?: string;
  packaging?: string;
}

export interface WishlistItem extends Omit<Product, 'price'> {
  quantity: number;
  price?: number; // For wishlist, a price is optional
}


export interface OrderItem extends Product {
  quantity: number;
  price: number;
}
