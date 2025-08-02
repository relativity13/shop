
"use client";

import { Heart, ShoppingBag, Search, Info, CreditCard, Phone, MessageCircle, MapPin, Building2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AppProvider, useApp } from '@/context/AppContext';
import { ProductsTab } from '@/components/ProductsTab';
import { WishlistTab } from '@/components/WishlistTab';
import { AboutTab } from '@/components/AboutTab';
import { CheckoutTab } from '@/components/CheckoutTab';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

import React, { useState, useMemo, useEffect } from 'react';
import type { Product } from '@/lib/types';
import { getProducts } from '@/services/productService';
import { productCategories, companyInfo } from '@/lib/data';


function CheckoutButton() {
  const { cart } = useApp();
  const itemCount = cart.length;

  return (
    <TabsTrigger value="checkout" className="py-3 flex-col h-full gap-1 relative">
      <CreditCard className="w-5 h-5" />
      {itemCount > 0 && (
        <span className="absolute top-1 right-1/2 translate-x-[20px] bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
      Checkout
    </TabsTrigger>
  );
}

function HomePageContent() {
  const { products } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('products');
  
  const categories = useMemo(() => {
    return ['All', ...productCategories];
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'All' || !selectedCategory || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, searchQuery, selectedCategory]);

  return (
    <main className="container mx-auto px-4 py-8 pb-24">
      <header className="text-center mb-8">
        <div className="flex justify-center items-center gap-4">
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
            {companyInfo.name}
          </h1>
        </div>
       
        <div className="flex justify-center gap-2 mt-4">
            <Button asChild variant="outline">
            <a href={`https://wa.me/${companyInfo.whatsappNumber}`} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
                <MessageCircle className="h-5 w-5" />
                Send WhatsApp
            </a>
            </Button>
            <Button asChild variant="outline">
            <a href={`tel:${companyInfo.phoneNumber}`} aria-label="Call the store">
                <Phone className="h-5 w-5" />
                Call us
            </a>
            </Button>
        </div>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {activeTab === 'products' && (
            <>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Search for products..." 
                  className="pl-10 w-full border-border"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="mb-8 p-4 bg-card rounded-lg shadow-sm flex flex-wrap justify-center gap-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category || (category === 'All' && !selectedCategory) ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category === 'All' ? null : category)}
                    className="rounded-full"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </>
          )}
        
        <TabsContent value="products">
          <ProductsTab products={filteredProducts} />
        </TabsContent>
        <TabsContent value="wishlist">
          <WishlistTab setActiveTab={setActiveTab} />
        </TabsContent>
         <TabsContent value="checkout">
          <CheckoutTab />
        </TabsContent>
        <TabsContent value="about">
          <AboutTab />
        </TabsContent>
        
        <TabsList className="grid w-full grid-cols-4 h-auto md:h-16 fixed bottom-0 left-0 right-0 z-10 bg-background/95 backdrop-blur-sm border-t md:rounded-none">
          <TabsTrigger value="products" className="py-3 flex-col h-full gap-1">
            <ShoppingBag className="w-5 h-5" />
            Products
          </TabsTrigger>
          <TabsTrigger value="wishlist" className="py-3 flex-col h-full gap-1">
            <Heart className="w-5 h-5" />
            Wishlist
          </TabsTrigger>
          <CheckoutButton />
          <TabsTrigger value="about" className="py-3 flex-col h-full gap-1">
            <Building2 className="w-5 h-5" />
            About Us
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </main>
  );
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading products...</div>;
  }
  
  return (
    <AppProvider initialProducts={products}>
      <HomePageContent />
    </AppProvider>
  )
}
