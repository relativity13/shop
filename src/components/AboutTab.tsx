
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Mail, Phone, Globe, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function AboutTab() {
  const companyPhoneNumber = "9876543210";

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <Image 
            src="https://placehold.co/600x400.png" 
            alt="Company building" 
            data-ai-hint="office building"
            width={600}
            height={400}
            className="w-full h-48 object-cover rounded-t-lg mb-4"
          />
          <div className="flex justify-between items-start">
            <div className="text-left">
              <CardTitle className="text-3xl font-bold">About HIKE CORPORATION</CardTitle>
              <CardDescription className="text-muted-foreground mt-1">Your Trusted Partner in Excellence</CardDescription>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button asChild variant="outline" size="sm">
                <a href={`https://wa.me/${companyPhoneNumber}`} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
                  <MessageCircle className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a href={`tel:${companyPhoneNumber}`} aria-label="Call the store">
                  <Phone className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-left text-muted-foreground pt-4 border-t">
            At HIKE CORPORATION, we're dedicated to supplying high-quality products with a seamless procurement experience. Our mission is to combine quality, convenience, and cutting-edge technology to redefine distribution.
          </p>
          
          <div className="border-t pt-4 space-y-2">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-muted-foreground" />
              <p>789 Industrial Park, Metro City, 54321</p>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <p>sales@hikecorporation.com</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <p>(987) 654-3210</p>
            </div>
             <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-muted-foreground" />
              <p>www.hikecorporation.com</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
