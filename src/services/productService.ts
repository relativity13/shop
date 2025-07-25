import { products } from '@/lib/data';
import type { Product } from '@/lib/types';

export async function getProducts(): Promise<Product[]> {
  // Simulate an async operation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 500);
  });
}
