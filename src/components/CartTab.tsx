
"use client";

import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';


export function CartTab() {
  const { cart, removeFromCart, updateCartItemQuantity, getCartTotal, clearCart } = useApp();

  const handleCheckout = () => {
    // This function is now deprecated in favor of the checkout tab
    // We can show a toast or simply do nothing
    console.log('Please navigate to the Checkout tab to complete your purchase.');
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
            <p className="text-sm text-muted-foreground text-center w-full">
              Ready to buy? Proceed to the 'Checkout' tab.
            </p>
        </CardFooter>
       </Card>
    </div>
  );
}
