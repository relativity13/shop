
"use client";

import { Trash2, Heart, Repeat } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardTitle, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatIndianCurrency } from '@/lib/utils';
import type { WishlistItem } from '@/lib/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
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
import React, { useState, useRef } from 'react';

type ActionType = 'order' | 'price';

interface WishlistTabProps {
  setActiveTab: (tab: string) => void;
}

export function WishlistTab({ setActiveTab }: WishlistTabProps) {
  const { wishlist, removeFromWishlist, updateWishlistItemQuantity, openWhatsApp, openWhatsAppForWishlist } = useApp();
  const [selectedProduct, setSelectedProduct] = useState<WishlistItem | null>(null);
  const [actionType, setActionType] = useState<ActionType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const quantityRef = useRef<HTMLInputElement>(null);

  const openDialog = (product: WishlistItem, type: ActionType) => {
    setSelectedProduct(product);
    setActionType(type);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
    setActionType(null);
  }
  
  const handleConfirmAction = () => {
    const quantity = parseInt(quantityRef.current?.value || '0', 10);
    if (!selectedProduct || quantity <= 0) {
      return;
    }
    
    openWhatsApp(selectedProduct, quantity, actionType as ActionType);
    closeDialog();
  };

  const handleRepeatOrder = () => {
    openWhatsAppForWishlist();
  };

  const canOrder = (product: WishlistItem) => {
    return typeof product.price === 'number' && product.price > 0;
  };

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 rounded-lg bg-card border">
        <Heart className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2 text-card-foreground">Your Wishlist is Empty</h2>
        <p className="text-muted-foreground">
          Browse our{' '}
            <Button variant="link" className="p-0 h-auto text-primary underline hover:text-accent" onClick={() => setActiveTab('products')}>
                products
            </Button>
          {' '} and add them here.
        </p>
      </div>
    );
  }

  return (
    <>
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
                  {typeof product.price === 'number' ? `₹${formatIndianCurrency(product.price)}` : 'Price on request'} / {product.unit}
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
              <div className="flex flex-col gap-2 flex-shrink-0 w-32">
                 {canOrder(product) ? (
                    <Button variant="whatsapp" className="w-full" onClick={() => openDialog(product, 'order')}>
                        Buy
                    </Button>
                 ) : (
                    <Button className="w-full" onClick={() => openDialog(product, 'price')}>
                        Ask for Price
                    </Button>
                 )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromWishlist(product.id)}
                  aria-label="Remove from wishlist"
                  className="self-center"
                >
                  <Trash2 className="h-5 w-5 text-red-500" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
      <CardFooter>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button onClick={handleRepeatOrder} className="w-full">
                      <Repeat className="mr-2 h-4 w-4" />
                      Request all via Whatsapp
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Sends all items with their saved quantities to the seller.</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
    
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Enter Quantity for {selectedProduct?.name}</AlertDialogTitle>
          <AlertDialogDescription>
            Please specify the quantity you would like to {actionType === 'price' ? 'get a price for' : 'order'}.
            {selectedProduct?.moq && ` (Minimum Order: ${selectedProduct.moq})`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex items-center gap-2 py-4">
            <Input
              ref={quantityRef}
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              min="1"
              placeholder="Quantity"
              defaultValue={selectedProduct?.quantity}
              className="w-full text-center"
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
