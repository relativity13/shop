
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useApp } from '@/context/AppContext';
import { user as mockUser } from '@/lib/data';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CreditCard, ShoppingCart } from "lucide-react";

const checkoutFormSchema = z.object({
  shippingAddress: z.string().min(10, {
    message: "Shipping address must be at least 10 characters.",
  }),
  billingAddress: z.string().min(10, {
    message: "Billing address must be at least 10 characters.",
  }),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

export function CheckoutTab() {
  const { cart, getCartTotal, clearCart } = useApp();
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      shippingAddress: mockUser.shippingAddress,
      billingAddress: mockUser.billingAddress,
    },
    mode: "onChange",
  });

  function onSubmit(data: CheckoutFormValues) {
    console.log("Order submitted:", data);
    console.log(`Thank you for your purchase. Your order total was $${getCartTotal().toFixed(2)}.`);
    clearCart();
    form.reset();
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 rounded-lg bg-card border">
        <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Your Cart is Empty</h2>
        <p className="text-muted-foreground">You cannot checkout with an empty cart. Add some products first.</p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Checkout</CardTitle>
            <CardDescription>Complete your order by providing the details below.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Order Summary */}
            <div>
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                <div className="space-y-2">
                    {cart.map(item => (
                        <div key={item.id} className="flex justify-between text-sm">
                            <span>{item.name} x {item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${getCartTotal().toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <Separator />

            {/* Shipping & Billing */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Shipping & Billing</h3>
               <div className="space-y-4">
                 <FormField
                    control={form.control}
                    name="shippingAddress"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Shipping Address</FormLabel>
                        <FormControl>
                            <Input placeholder="Your company's shipping address" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                    control={form.control}
                    name="billingAddress"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Billing Address</FormLabel>
                        <FormControl>
                            <Input placeholder="Your company's billing address" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
               </div>
            </div>
            
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              <CreditCard className="mr-2 h-4 w-4" />
              Place Order (${getCartTotal().toFixed(2)})
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
