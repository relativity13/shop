"use client";

import Image from 'next/image';
import { Heart } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ProductsTab() {
  const { products, addToWishlist, removeFromWishlist, isInWishlist } = useApp();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg">
          <CardContent className="p-4 flex-grow">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg font-semibold mb-2 pr-2">{product.name}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="flex-shrink-0"
                onClick={() => (isInWishlist(product.id) ? removeFromWishlist(product.id) : addToWishlist(product))}
                aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={cn("h-6 w-6", isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground')} />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">{product.description}</p>
            <div className="text-sm text-muted-foreground mt-2">
              <p className="font-bold text-primary">${product.price.toFixed(2)} / {product.unit}</p>
              <p>Ships from: {product.factoryLocation}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
