
export interface Product {
  id: number | string;
  name: string;
  description: string;
  price?: number;
  unit: string;
  factoryLocation: string;
  imageUrl: string;
  category: string;
  moq?: string;
}

export interface WishlistItem extends Product {
  quantity: number;
  price: number;
}


export interface OrderItem extends Product {
  quantity: number;
  price: number;
}
