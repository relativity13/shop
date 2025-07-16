"use client";

import { Heart, ShoppingCart } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ProductsTab() {
  const { products, addToWishlist, removeFromWishlist, isInWishlist, addToCart } = useApp();

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <Card key={product.id} className="transition-shadow duration-300 hover:shadow-lg">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex-grow">
              <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
              <div className="text-sm text-muted-foreground mt-2 flex gap-4">
                <p className="font-bold text-primary">${product.price.toFixed(2)} / {product.unit}</p>
                <p>Ships from: {product.factoryLocation}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => (isInWishlist(product.id) ? removeFromWishlist(product.id) : addToWishlist(product))}
                aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={cn("h-6 w-6", isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground')} />
              </Button>
               <Button
                variant="ghost"
                size="icon"
                onClick={() => addToCart(product)}
                aria-label="Add to cart"
              >
                <ShoppingCart className="h-6 w-6 text-primary" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
