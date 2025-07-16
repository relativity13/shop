"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Mail, Phone, Globe } from 'lucide-react';
import Image from 'next/image';

export function AboutTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="text-center">
          <Image 
            src="https://placehold.co/600x400.png" 
            alt="Company building" 
            data-ai-hint="office building"
            width={600}
            height={400}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <CardTitle className="text-3xl font-bold mt-4">About ShopFront</CardTitle>
          <CardDescription className="text-muted-foreground">Your Trusted Partner in Modern Shopping</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            At ShopFront, we're dedicated to bringing you the best products with a seamless shopping experience. Our mission is to combine quality, convenience, and cutting-edge technology to redefine e-commerce.
          </p>
          
          <div className="border-t pt-4 space-y-2">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-muted-foreground" />
              <p>123 Tech Lane, Innovation City, 12345</p>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <p>contact@shopfront.com</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <p>(123) 456-7890</p>
            </div>
             <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-muted-foreground" />
              <p>www.shopfront.com</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}