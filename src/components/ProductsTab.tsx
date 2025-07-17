
"use client";

import { Heart, ShoppingCart } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export function ProductsTab() {
  const { products, addToWishlist, removeFromWishlist, isInWishlist, addToCart } = useApp();
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const handleQuantityChange = (productId: number, quantity: string) => {
    const numQuantity = parseInt(quantity, 10);
    setQuantities(prev => ({ ...prev, [productId]: isNaN(numQuantity) ? 0 : numQuantity }));
  };
  
  const handleAddToCart = (product: any) => {
    const quantity = quantities[product.id] || 1;
    addToCart(product, quantity);
  };

  const handleWishlistAction = (product: any) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      const quantity = quantities[product.id] || 1;
      addToWishlist(product, quantity);
    }
  };

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <Card key={product.id} className="transition-shadow duration-300 hover:shadow-lg">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex-grow">
              <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
              <div className="text-sm text-muted-foreground mt-2 flex gap-4 items-center">
                <p className="font-bold text-primary">${product.price.toFixed(2)} / {product.unit}</p>
                <p>Ships from: {product.factoryLocation}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-shrink-0 items-center w-32">
              <div className="flex items-center gap-2">
                 <Input
                    type="number"
                    min="1"
                    placeholder="Qty"
                    className="w-20 h-8 text-center"
                    value={quantities[product.id] || ''}
                    onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                    aria-label={`Quantity for ${product.name} in ${product.unit}s`}
                  />
                  <span className="text-sm text-muted-foreground">{product.unit}</span>
              </div>
              <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleWishlistAction(product)}
                    aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Heart className={cn("h-6 w-6", isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground')} />
                  </Button>
                   <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleAddToCart(product)}
                    aria-label="Add to cart"
                  >
                    <ShoppingCart className="h-6 w-6 text-primary" />
                  </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
