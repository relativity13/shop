
"use client";

import { Heart, ShoppingBag, Search, CreditCard, Phone, Building2, FlaskConical } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApp } from '@/context/AppContext';
import { ProductsTab } from '@/components/ProductsTab';
import { WishlistTab } from '@/components/WishlistTab';
import { AboutTab } from '@/components/AboutTab';
import { RequestTab } from '@/components/RequestTab';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

import React, { useState, useMemo } from 'react';
import { productCategories, companyInfo } from '@/lib/data';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { WhatsappIcon } from '@/components/icons/WhatsappIcon';
import type { Product } from '@/lib/types';


export function HomePageContent() {
  const { products } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('products');
  
  const categories = useMemo(() => {
    return ['All', ...productCategories];
  }, []);

  const getPriceSortOrder = (product: Product) => {
    if (typeof product.price === 'number') {
      return 1; // Highest priority for fixed price
    }
    if (typeof product.price === 'object' && product.price !== null) {
      return 2; // Second priority for price range
    }
    return 3; // Lowest priority for "Price on request"
  };

  const filteredProducts = useMemo(() => {
    const filtered = products.filter(product => {
      const matchesCategory = selectedCategory === 'All' || !selectedCategory || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    return filtered.sort((a, b) => getPriceSortOrder(a) - getPriceSortOrder(b));
  }, [products, searchQuery, selectedCategory]);

  return (
    <main className="container mx-auto px-4 py-8 pb-24">
        <header className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 mb-8">
            <div className="w-full md:flex-1 flex justify-center items-center gap-4">
                <Image src="https://placehold.co/48x48.png" alt="Logo" width={40} height={40} className="w-10 h-10 md:w-12 md:h-12" />
                <h1 className="font-headline text-3xl md:text-5xl font-bold tracking-tight text-accent whitespace-nowrap">
                    {companyInfo.name}
                </h1>
            </div>
        
            <div className="flex-1 flex justify-center md:justify-end">
                <div className="flex items-center gap-2">
                    <Button asChild variant="whatsapp" className="p-2 md:px-4 md:py-2">
                    <a href={`https://wa.me/${companyInfo.whatsappNumber}`} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="flex items-center gap-2">
                        <WhatsappIcon />
                        <span className="hidden md:inline">Send WhatsApp</span>
                    </a>
                    </Button>
                    <Button asChild variant="outline" className="p-2 md:px-4 md:py-2">
                    <a href={`tel:${companyInfo.phoneNumber}`} aria-label="Call the store" className="flex items-center gap-2">
                        <Phone className="h-5 w-5" />
                        <span className="hidden md:inline">Call us</span>
                    </a>
                    </Button>
                </div>
            </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {activeTab === 'products' && (
                <>
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                    placeholder="Search for products..." 
                    className="pl-10 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="mb-8">
                    <Carousel opts={{ align: "start", dragFree: true }} className="w-full">
                    <CarouselContent>
                        {categories.map((category, index) => (
                        <CarouselItem key={index} className="basis-auto">
                            <Button
                            variant={selectedCategory === category || (category === 'All' && !selectedCategory) ? "default" : "outline"}
                            onClick={() => setSelectedCategory(category === 'All' ? null : category)}
                            className="rounded-full border-foreground"
                            >
                            {category}
                            </Button>
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    </Carousel>
                </div>
                </>
            )}
            
            <TabsContent value="products">
                <ProductsTab products={filteredProducts} />
            </TabsContent>
            <TabsContent value="wishlist">
                <WishlistTab setActiveTab={setActiveTab} />
            </TabsContent>
            <TabsContent value="requests">
                <RequestTab />
            </TabsContent>
            <TabsContent value="about">
                <AboutTab />
            </TabsContent>
            
            <TabsList className="grid w-full grid-cols-4 h-auto md:h-16 fixed bottom-0 left-0 right-0 z-10 bg-background/95 backdrop-blur-sm border-t md:rounded-none">
            <TabsTrigger value="products" className="py-3 flex-col h-full gap-1">
                <FlaskConical className="w-5 h-5" />
                Products
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="py-3 flex-col h-full gap-1">
                <Heart className="w-5 h-5" />
                Wishlist
            </TabsTrigger>
            <TabsTrigger value="requests" className="py-3 flex-col h-full gap-1">
                <ShoppingBag className="w-5 h-5" />
                Requests
            </TabsTrigger>
            <TabsTrigger value="about" className="py-3 flex-col h-full gap-1">
                <Building2 className="w-5 h-5" />
                About Us
            </TabsTrigger>
            </TabsList>
        </Tabs>
    </main>
  );
}
