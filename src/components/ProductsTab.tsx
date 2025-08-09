
"use client";

import { Heart, MessageCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useState, useRef } from 'react';
import type { Product } from '@/lib/types';
import { formatIndianCurrency } from '@/lib/utils';
import { companyInfo } from '@/lib/data';
import { WhatsappIcon } from '@/components/icons/WhatsappIcon';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type ActionType = 'order' | 'quote' | 'wishlist';

export function ProductsTab() {
  const { products, addToWishlist, removeFromWishlist, isInWishlist, addToCart } = useApp();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [actionType, setActionType] = useState<ActionType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const quantityRef = useRef<HTMLInputElement>(null);

  const openDialog = (product: Product, type: ActionType) => {
    setSelectedProduct(product);
    setActionType(type);
    setIsDialogOpen(true);
  };

  const handleWishlistAction = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      // For wishlist, we can ask for quantity or just add with a default of 1
      openDialog(product, 'wishlist');
    }
  };
  
  const handleConfirmAction = () => {
    const quantity = parseInt(quantityRef.current?.value || '0', 10);
    if (!selectedProduct || quantity <= 0) {
      // Optionally show an error message
      return;
    }
    
    if (actionType === 'order') {
        if (typeof selectedProduct.price !== 'number') return;
        addToCart(selectedProduct, quantity);
        const message = `*New Order Request*\n\nI would like to order the following item:\n\n- *Product:* ${selectedProduct.name}\n- *Quantity:* ${quantity} ${selectedProduct.unit}\n- *Price per unit:* ₹${formatIndianCurrency(selectedProduct.price)}\n\nThank you!`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${companyInfo.whatsappNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    } else if (actionType === 'quote') {
        const message = `*Quote Needed*\n\nI'm interested in the following product:\n\n- *Product:* ${selectedProduct.name}\n- *Description:* ${selectedProduct.description}\n- *Quantity:* ${quantity} ${selectedProduct.unit}\n\nPlease provide a quote. Thank you!`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${companyInfo.whatsappNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    } else if (actionType === 'wishlist') {
        addToWishlist(selectedProduct, quantity);
    }

    closeDialog();
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
    setActionType(null);
  }

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
    <>
      <div className="space-y-4">
        {products.map((product) => (
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
                  {canOrder(product) ? (
                      <div className="flex flex-col items-center gap-2 w-full">
                           <Button
                            variant="whatsapp"
                            onClick={() => openDialog(product, 'order')}
                            aria-label="Order now via WhatsApp"
                            className="w-full"
                          >
                            Order
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
                  ) : (
                    <div className="flex flex-col items-center gap-2 w-full">
                       <Button 
                         onClick={() => openDialog(product, 'quote')} 
                         className="w-full"
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
        ))}
      </div>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Enter Quantity for {selectedProduct?.name}</AlertDialogTitle>
            <AlertDialogDescription>
              Please specify the quantity you would like to {actionType}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex items-center gap-2 py-4">
              <Input
                ref={quantityRef}
                type="number"
                min="1"
                placeholder="Quantity"
                className="w-full text-center"
                defaultValue="1"
                aria-label={`Quantity for ${selectedProduct?.name} in ${selectedProduct?.unit}s`}
              />
              <span className="text-sm font-medium text-muted-foreground">{selectedProduct?.unit}</span>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeDialog}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmAction}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
