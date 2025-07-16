"use client";

import { Heart, ListOrdered, ShoppingBag, User } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AppProvider } from '@/context/AppContext';
import { ProductsTab } from '@/components/ProductsTab';
import { WishlistTab } from '@/components/WishlistTab';
import { OrdersTab } from '@/components/OrdersTab';
import { ProfileTab } from '@/components/ProfileTab';

export default function Home() {
  return (
    <AppProvider>
      <main className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
            ShopFront
          </h1>
          <p className="text-muted-foreground mt-2">Your Modern Shopping Experience</p>
        </header>

        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto md:h-10">
            <TabsTrigger value="products" className="py-2.5">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Products
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="py-2.5">
              <Heart className="w-5 h-5 mr-2" />
              Wishlist
            </TabsTrigger>
            <TabsTrigger value="orders" className="py-2.5">
              <ListOrdered className="w-5 h-5 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="profile" className="py-2.5">
              <User className="w-5 h-5 mr-2" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-6">
            <ProductsTab />
          </TabsContent>
          <TabsContent value="wishlist" className="mt-6">
            <WishlistTab />
          </TabsContent>
          <TabsContent value="orders" className="mt-6">
            <OrdersTab />
          </TabsContent>
          <TabsContent value="profile" className="mt-6">
            <ProfileTab />
          </TabsContent>
        </Tabs>
      </main>
    </AppProvider>
  );
}
