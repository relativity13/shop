
"use client";

import { Trash2, Heart, ShoppingCart, Repeat } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardTitle, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function WishlistTab() {
  const { wishlist, removeFromWishlist, addWishlistToCart } = useApp();

  const handleRepeatOrder = () => {
    addWishlistToCart();
    console.log("Your saved wishlist order has been added to the cart.");
  };

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
    <Card>
      <CardHeader>
        <CardTitle>Your Saved Order</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {wishlist.map((product) => (
          <Card key={product.id} className="transition-shadow duration-300 hover:shadow-lg">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="flex-grow">
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-muted-foreground">
                  ${product.price.toFixed(2)} / {product.unit}
                </p>
                <p className="text-sm text-primary font-bold mt-1">
                  Quantity: {product.quantity} {product.unit}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFromWishlist(product.id)}
                aria-label="Remove from wishlist"
              >
                <Trash2 className="h-5 w-5 text-red-500" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </CardContent>
      <CardFooter>
        <Button onClick={handleRepeatOrder} className="w-full">
          <Repeat className="mr-2 h-4 w-4" />
          Add All to Cart & Repeat Order
        </Button>
      </CardFooter>
    </Card>
  );
}
