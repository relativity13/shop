"use client";

import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function CartTab() {
  const { cart, removeFromCart, updateCartItemQuantity, getCartTotal, clearCart } = useApp();
  const { toast } = useToast();

  const handleCheckout = () => {
    // In a real app, this would redirect to a checkout page or open a payment modal.
    console.log('Checking out with total:', getCartTotal());
    toast({
      title: 'Checkout Successful!',
      description: `Your order has been placed. Total: $${getCartTotal().toFixed(2)}`,
    });
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 rounded-lg bg-card border">
        <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Your Cart is Empty</h2>
        <p className="text-muted-foreground">Browse products and add them to your cart.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
       <Card>
        <CardHeader>
          <CardTitle>Your Shopping Cart</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="flex-grow">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateCartItemQuantity(item.id, parseInt(e.target.value) || 1)}
                  className="w-16 h-8 text-center"
                  aria-label={`Quantity for ${item.name}`}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <Trash2 className="h-5 w-5 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
          <Separator />
          <div className="flex justify-between items-center font-bold text-lg">
            <span>Total</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleCheckout}>
            Proceed to Checkout
          </Button>
        </CardFooter>
       </Card>
    </div>
  );
}
