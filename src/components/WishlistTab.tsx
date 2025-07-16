"use client";

import Image from 'next/image';
import { Trash2, Heart } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function WishlistTab() {
  const { wishlist, removeFromWishlist } = useApp();

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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {wishlist.map((product) => (
        <Card key={product.id} className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg">
          <CardContent className="p-4 flex-grow">
            <CardTitle className="text-lg font-semibold mb-2">{product.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{product.description}</p>
            <div className="text-sm text-muted-foreground mt-2">
              <p>Price: ${product.price.toFixed(2)} / {product.unit}</p>
              <p>Ships from: {product.factoryLocation}</p>
            </div>
          </CardContent>
          <CardFooter className="p-4 flex justify-between items-center">
            <p className="text-xl font-bold text-primary">${product.price}</p>
            <Button
              variant="outline"
              size="icon"
              onClick={() => removeFromWishlist(product.id)}
              aria-label="Remove from wishlist"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
