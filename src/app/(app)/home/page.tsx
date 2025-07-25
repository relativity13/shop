
"use client";

import { Heart, ListOrdered, ShoppingBag, User, Search, Info, CreditCard, Phone, MessageCircle, MapPin } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AppProvider, useApp } from '@/context/AppContext';
import { ProductsTab } from '@/components/ProductsTab';
import { WishlistTab } from '@/components/WishlistTab';
import { OrdersTab } from '@/components/OrdersTab';
import { ProfileTab } from '@/components/ProfileTab';
import { AboutTab } from '@/components/AboutTab';
import { CheckoutTab } from '@/components/CheckoutTab';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { user as mockUser } from '@/lib/data';

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
  const companyPhoneNumber = "9876543210";
  const sellerWhatsAppNumber = "919310619600";

  return (
    <main className="container mx-auto px-4 py-8 pb-24">
      <header className="text-center mb-8">
        <div className="flex justify-center items-center gap-4">
          <Image src="/logo.png" alt="HIKE CORPORATION Logo" width={50} height={50} />
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
            HIKE CORPORATION
          </h1>
        </div>
        <p className="text-muted-foreground mt-2">Your Modern Shopping Experience</p>
        <div className="flex items-center justify-center gap-2 text-muted-foreground mt-2">
            <MapPin className="h-4 w-4" />
            <p>{mockUser.shippingAddress}</p>
        </div>
        <div className="flex justify-center gap-2 mt-4">
            <Button asChild variant="outline">
            <a href={`https://wa.me/${sellerWhatsAppNumber}`} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
                <MessageCircle className="h-5 w-5" />
                Send WhatsApp
            </a>
            </Button>
            <Button asChild variant="outline">
            <a href={`tel:${companyPhoneNumber}`} aria-label="Call the store">
                <Phone className="h-5 w-5" />
                Call us
            </a>
            </Button>
        </div>
      </header>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search for products..." className="pl-10 w-full" />
      </div>

      <Tabs defaultValue="products" className="w-full">
        <TabsContent value="products">
          <ProductsTab />
        </TabsContent>
        <TabsContent value="wishlist">
          <WishlistTab />
        </TabsContent>
        <TabsContent value="orders">
          <OrdersTab />
        </TabsContent>
         <TabsContent value="checkout">
          <CheckoutTab />
        </TabsContent>
        <TabsContent value="profile">
          <ProfileTab />
        </TabsContent>
        <TabsContent value="about">
          <AboutTab />
        </TabsContent>
        
        <TabsList className="grid w-full grid-cols-6 h-auto md:h-16 fixed bottom-0 left-0 right-0 z-10 bg-background/95 backdrop-blur-sm border-t md:rounded-none">
          <TabsTrigger value="products" className="py-3 flex-col h-full gap-1">
            <ShoppingBag className="w-5 h-5" />
            Products
          </TabsTrigger>
          <TabsTrigger value="wishlist" className="py-3 flex-col h-full gap-1">
            <Heart className="w-5 h-5" />
            Wishlist
          </TabsTrigger>
          <TabsTrigger value="orders" className="py-3 flex-col h-full gap-1">
            <ListOrdered className="w-5 h-5" />
            Orders
          </TabsTrigger>
          <CheckoutButton />
          <TabsTrigger value="profile" className="py-3 flex-col h-full gap-1">
            <User className="w-5 h-5" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="about" className="py-3 flex-col h-full gap-1">
            <Info className="w-5 h-5" />
            About
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </main>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <HomePageContent />
    </AppProvider>
  )
}
