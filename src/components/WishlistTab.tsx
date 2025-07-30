
"use client";

import { Trash2, Heart, ShoppingCart, Repeat } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardTitle, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatIndianCurrency } from '@/lib/utils';

export function WishlistTab() {
  const { wishlist, removeFromWishlist, addWishlistToCart, updateWishlistItemQuantity, addToCart } = useApp();

  const handleRepeatOrder = () => {
    addWishlistToCart();
    console.log("Your saved wishlist order has been added to the cart.");
  };
  
  const handleAddToCart = (product: any) => {
    addToCart(product, product.quantity);
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
        <CardTitle>Wishlist</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {wishlist.map((product) => (
          <Card key={product.id} className="transition-shadow duration-300 hover:shadow-lg">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="flex-grow">
                <p className="font-semibold">{product.name}</p>
                <p className="text-base font-medium text-muted-foreground">
                  ₹{formatIndianCurrency(product.price)} / {product.unit}
                </p>
                <div className="flex items-center gap-2 mt-2">
                   <Input
                    type="number"
                    min="1"
                    value={product.quantity}
                    onChange={(e) => updateWishlistItemQuantity(product.id, parseInt(e.target.value) || 1)}
                    className="w-20 h-8 text-center"
                    aria-label={`Quantity for ${product.name}`}
                  />
                   <span className="text-sm text-muted-foreground">{product.unit}</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                 <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleAddToCart(product)}
                    aria-label="Add to cart"
                  >
                    <ShoppingCart className="h-5 w-5 text-primary" />
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
