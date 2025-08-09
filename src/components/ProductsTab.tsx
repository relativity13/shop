
"use client";

import { Heart, MessageCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import type { Product } from '@/lib/types';
import { formatIndianCurrency } from '@/lib/utils';
import { companyInfo } from '@/lib/data';

export function ProductsTab() {
  const { products, addToWishlist, removeFromWishlist, isInWishlist, addToCart } = useApp();
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const handleQuantityChange = (productId: string | number, quantity: string) => {
    const numQuantity = parseInt(quantity, 10);
    setQuantities(prev => ({ ...prev, [productId.toString()]: isNaN(numQuantity) ? 0 : numQuantity }));
  };
  
  const handleOrder = (product: Product) => {
    if (typeof product.price !== 'number') return;
    const quantity = quantities[product.id.toString()] || 1;
    addToCart(product, quantity);
    
    const message = `*New Order Request*\n\nI would like to order the following item:\n\n- *Product:* ${product.name}\n- *Quantity:* ${quantity} ${product.unit}\n- *Price per unit:* ₹${formatIndianCurrency(product.price)}\n\nThank you!`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${companyInfo.whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleWishlistAction = (product: Product) => {
    const quantity = quantities[product.id.toString()] || 1;
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product, quantity);
    }
  };

  const handleAskForQuote = (product: Product) => {
    const quantity = quantities[product.id.toString()] || 1;
    const message = `*Quote Needed*\n\nI'm interested in the following product:\n\n- *Product:* ${product.name}\n- *Description:* ${product.description}\n- *Quantity:* ${quantity} ${product.unit}\n\nPlease provide a quote. Thank you!`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${companyInfo.whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const renderPrice = (product: Product) => {
    if (typeof product.price === 'number' && product.price > 0) {
      return `₹${formatIndianCurrency(product.price)} / ${product.unit}`;
    }
    if (typeof product.price === 'object' && product.price !== null) {
        return `₹${formatIndianCurrency(product.price.min)} - ₹${formatIndianCurrency(product.price.max)} / ${product.unit}`;
    }
    return 'Price on request';
  }

  const canOrder = (product: Product) => {
      return typeof product.price === 'number' && product.price > 0;
  }

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
      {products.map((product) => {
        const quantity = quantities[product.id.toString()];
        const isQuantityValid = quantity && quantity > 0;

        return (
          <Card key={product.id} className="transition-shadow duration-300 hover:shadow-lg hover:border-accent">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="flex-grow">
                <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                <div className="text-sm text-muted-foreground mt-2 flex gap-4 items-center flex-wrap">
                  <p className="text-lg font-bold text-primary">{renderPrice(product)}</p>
                  {product.moq && (
                    <p className="font-semibold">MOQ: {product.moq}</p>
                  )}
                  <p>Ex: {product.factoryLocation}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-shrink-0 items-center w-32">
                <div className="flex items-center gap-2">
                  <Input
                      type="number"
                      min="1"
                      placeholder="Qty"
                      className="w-20 h-8 text-center"
                      value={quantity || ''}
                      onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                      aria-label={`Quantity for ${product.name} in ${product.unit}s`}
                    />
                    <span className="text-sm text-muted-foreground">{product.unit}</span>
                </div>

                {canOrder(product) ? (
                    <div className="flex gap-2 w-full">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleWishlistAction(product)}
                          aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                        >
                          <Heart className={cn("h-6 w-6", isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground')} />
                        </Button>
                        <Button
                          onClick={() => handleOrder(product)}
                          aria-label="Order now via WhatsApp"
                          className="flex-grow"
                          disabled={!isQuantityValid}
                        >
                          Order
                        </Button>
                    </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 w-full">
                     <Button 
                       onClick={() => handleAskForQuote(product)} 
                       className="w-full"
                       disabled={!isQuantityValid}
                     >
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
        )
      })}
    </div>
  );
}
