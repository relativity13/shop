
import { HomePageContent } from '@/components/HomePageContent';
import { getProducts } from '@/services/productService';
import type { Product } from '@/lib/types';
import { AppProvider } from '@/context/AppContext';

export default async function HomePage() {
  const products: Product[] = await getProducts();

  return (
    <AppProvider initialProducts={products}>
      <HomePageContent />
    </AppProvider>
  );
}
