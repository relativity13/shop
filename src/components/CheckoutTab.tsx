
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useApp } from '@/context/AppContext';
import { user as mockUser } from '@/lib/data';
import React, { useState } from "react";

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
import { ShoppingCart, Minus, Plus } from "lucide-react";
import Image from "next/image";


const checkoutFormSchema = z.object({
  shippingAddress: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

export function CheckoutTab() {
  const { cart, getCartTotal, clearCart, removeFromCart, updateCartItemQuantity } = useApp();
  const [deliveryMethod, setDeliveryMethod] = useState<'deliver' | 'pickup'>('deliver');

  // Hardcoded WhatsApp number
  const sellerWhatsAppNumber = "919310619600"; 

  const subtotal = getCartTotal();
  const taxRate = 0.18; // 18% tax
  
  const getDeliveryCharge = (method: 'deliver' | 'pickup') => method === 'deliver' ? 50.00 : 0.00;
  
  const calculateTotal = (method: 'deliver' | 'pickup') => {
    const deliveryCharge = getDeliveryCharge(method);
    const taxAmount = subtotal * taxRate;
    return subtotal + taxAmount + deliveryCharge;
  }

  const deliveryCharge = getDeliveryCharge(deliveryMethod);
  const taxAmount = subtotal * taxRate;
  const totalPayable = calculateTotal(deliveryMethod);
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      shippingAddress: mockUser.shippingAddress,
    },
    mode: "onChange",
  });

  const handleOrderPlacement = (selectedDeliveryMethod: 'deliver' | 'pickup') => {
    const formData = form.getValues();
    const finalTotal = calculateTotal(selectedDeliveryMethod);
    const finalDeliveryCharge = getDeliveryCharge(selectedDeliveryMethod);

    let message = `*New Order Details*\n\n`;
    message += `*Customer Details:*\n`;
    message += `Company: ${mockUser.name}\n`;
    message += `Manager: ${mockUser.managerName}\n`;
    message += `Email: ${mockUser.email}\n`;
    message += `Phone: ${mockUser.phone}\n\n`;

    message += `*Order Items:*\n`;
    cart.forEach(item => {
      message += `- ${item.name} (${item.quantity} ${item.unit}) - ₹${(item.price * item.quantity).toFixed(2)}\n`;
    });
    message += `\n`;

    message += `*Bill Details:*\n`;
    message += `Subtotal: ₹${subtotal.toFixed(2)}\n`;
    message += `Tax (18%): ₹${(subtotal * taxRate).toFixed(2)}\n`;
    message += `Delivery Charge: ₹${finalDeliveryCharge.toFixed(2)}\n`;
    message += `*Total Payable: ₹${finalTotal.toFixed(2)}*\n\n`;

    message += `*Delivery Method:*\n`;
    message += `${selectedDeliveryMethod === 'deliver' ? 'Deliver' : 'I will Pickup'}\n`;
    if (selectedDeliveryMethod === 'deliver') {
      message += `*Shipping Address:*\n${formData.shippingAddress}\n`;
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${sellerWhatsAppNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');

    // Clear cart and form after sending
    clearCart();
    form.reset();
  };


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
    <div className="space-y-4">
      {/* Items in Cart */}
      <Card>
        <CardHeader>
          <CardTitle>Items ({cart.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <Image 
                src={item.imageUrl} 
                alt={item.name} 
                width={64} 
                height={64}
                className="w-16 h-16 rounded-md object-cover border"
                data-ai-hint="chemical container"
              />
              <div className="flex-grow">
                <p className="font-semibold">{item.name}</p>
                 <Button variant="link" size="sm" className="p-0 h-auto text-red-500" onClick={() => removeFromCart(item.id.toString())}>
                   Remove
                 </Button>
              </div>
              <div className="text-right">
                <p className="font-semibold text-lg">₹{(item.price * item.quantity).toFixed(2)}</p>
                <div className="flex items-center justify-end gap-1 border rounded-md mt-1">
                  <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateCartItemQuantity(item.id, parseInt(e.target.value) || 1)}
                    className="w-12 h-8 text-center border-0 focus-visible:ring-0"
                  />
                   <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      
      {/* Bill Details */}
      <Card>
        <CardHeader>
          <CardTitle>Bill Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Sub Total</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax (18%)</span>
            <span>₹{taxAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Delivery Charge</span>
            <span>₹{deliveryCharge.toFixed(2)}</span>
          </div>
          <Separator />
           <div className="flex justify-between font-bold text-lg">
            <span>Payable</span>
            <span>₹{totalPayable.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Shipping & Final Actions */}
       <Form {...form}>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
           {deliveryMethod === 'deliver' && (
              <Card>
                <CardHeader>
                    <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent>
                    <FormField
                        control={form.control}
                        name="shippingAddress"
                        render={({ field }) => (
                            <FormItem>
                            <FormControl>
                                <Input placeholder="Enter your shipping address" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </CardContent>
              </Card>
           )}
          
          <div className="grid grid-cols-2 gap-4">
             <Button
                type="button"
                className="flex flex-col h-auto py-3"
                onClick={() => {
                  setDeliveryMethod('pickup');
                  handleOrderPlacement('pickup');
                }}
            >
                <p className="font-semibold">I will Pickup</p>
                <p className="text-xs font-normal">Confirm Order</p>
            </Button>
             <Button
                type="button"
                className="flex flex-col h-auto py-3"
                onClick={() => {
                  setDeliveryMethod('deliver');
                  form.handleSubmit(() => handleOrderPlacement('deliver'))();
                }}
            >
                <p className="font-semibold">Deliver</p>
                <p className="text-xs font-normal">Confirm Order</p>
            </Button>
          </div>
        </form>
       </Form>
    </div>
  );
}
