export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  unit: string;
  factoryLocation: string;
  imageUrl: string;
  category: string;
}

export interface OrderItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: 'Delivered' | 'Processing' | 'Cancelled';
}

export interface User {
  name: string;
  email: string;
  address: string;
  avatarUrl: string;
}
