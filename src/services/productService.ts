import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import type { Product } from '@/lib/types';

export async function getProducts(): Promise<Product[]> {
  const productsCollection = collection(db, 'products');
  const productSnapshot = await getDocs(productsCollection);
  const productList = productSnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
    } as unknown as Product;
  });
  return productList;
}
