"use client";

import { Trash2, Heart, ShoppingCart } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function WishlistTab() {
  const { wishlist, removeFromWishlist, addToCart } = useApp();

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 rounded-lg bg-card border">
        <Heart className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Your Wishlist is Empty</h2>
        <p className="text-muted-foreground">Add products you love to your wishlist to keep track of them.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {wishlist.map((product) => (
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
                onClick={() => addToCart(product)}
                aria-label="Add to cart"
              >
                <ShoppingCart className="h-6 w-6 text-primary" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFromWishlist(product.id)}
                aria-label="Remove from wishlist"
              >
                <Trash2 className="h-5 w-5 text-red-500" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
