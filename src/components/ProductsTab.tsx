
"use client";

import { Heart, ShoppingCart, MessageCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import type { Product } from '@/lib/types';
import { formatIndianCurrency } from '@/lib/utils';

interface ProductsTabProps {
  products: Product[];
}

export function ProductsTab({ products }: ProductsTabProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist, addToCart } = useApp();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const sellerWhatsAppNumber = "919310619600";

  const handleQuantityChange = (productId: string | number, quantity: string) => {
    const numQuantity = parseInt(quantity, 10);
    setQuantities(prev => ({ ...prev, [productId.toString()]: isNaN(numQuantity) ? 0 : numQuantity }));
  };
  
  const handleAddToCart = (product: Product) => {
    if (product.price === undefined) return;
    const quantity = quantities[product.id.toString()] || 1;
    addToCart(product, quantity);
  };

  const handleWishlistAction = (product: Product) => {
    // For products without a price, we can add to wishlist with quantity 1 and price 0.
    const price = product.price || 0;
    const quantity = quantities[product.id.toString()] || 1;

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({ ...product, price }, quantity);
    }
  };

  const handleAskForQuote = (productName: string) => {
    const message = `I would like a quote for the following product: ${productName}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${sellerWhatsAppNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-muted-foreground">No products found.</p>
        <p className="text-sm text-muted-foreground">Try adjusting your search or category filter.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <Card key={product.id} className="transition-shadow duration-300 hover:shadow-lg">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex-grow">
              <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
              <div className="text-sm text-muted-foreground mt-2 flex gap-4 items-center flex-wrap">
                {typeof product.price === 'number' && product.price > 0 ? (
                  <p className="text-xl font-bold text-primary">₹{formatIndianCurrency(product.price)} / {product.unit}</p>
                ) : (
                   <p className="text-lg font-bold text-primary">Price on request</p>
                )}
                {product.moq && (
                  <p className="font-semibold">MOQ: {product.moq}</p>
                )}
                <p>Ships from: {product.factoryLocation}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-shrink-0 items-center w-32">
              {typeof product.price === 'number' && product.price > 0 ? (
                <>
                  <div className="flex items-center gap-2">
                    <Input
                        type="number"
                        min="1"
                        placeholder="Qty"
                        className="w-20 h-8 text-center"
                        value={quantities[product.id.toString()] || ''}
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
                </>
              ) : (
                <div className="flex flex-col items-center gap-2">
                   <Button onClick={() => handleAskForQuote(product.name)} className="w-full">
                     <MessageCircle className="mr-2 h-4 w-4" />
                     Ask for Quote
                   </Button>
                   <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleWishlistAction(product)}
                      aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      <Heart className={cn("h-6 w-6", isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground')} />
                    </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
