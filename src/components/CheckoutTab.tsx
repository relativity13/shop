
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useApp } from '@/context/AppContext';
import React, { useState } from "react";
import { formatIndianCurrency } from '@/lib/utils';

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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";


const checkoutFormSchema = z.object({
  shippingAddress: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

export function CheckoutTab() {
  const { cart, getCartTotal, clearCart, removeFromCart, updateCartItemQuantity } = useApp();
  const [deliveryMethod, setDeliveryMethod] = useState<'deliver' | 'pickup'>('deliver');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [whatsappMessage, setWhatsappMessage] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');


  // Hardcoded WhatsApp number
  const sellerWhatsAppNumber = "919310619600"; 

  const subtotal = getCartTotal();
  const taxRate = 0.18; // 18% tax
  
  const calculateTotal = () => {
    const taxAmount = subtotal * taxRate;
    return subtotal + taxAmount;
  }

  const taxAmount = subtotal * taxRate;
  const totalPayable = calculateTotal();
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
        mode: "onChange",
  });

  const prepareAndConfirmOrder = (selectedDeliveryMethod: 'deliver' | 'pickup') => {
    const formData = form.getValues();
    const finalTotal = calculateTotal();

    let message = `*New Order Details*\n\n`;
    message += `*Customer Details:*\n`;
  

    message += `*Order Items:*\n`;
    cart.forEach(item => {
      message += `- ${item.name} (${item.quantity} ${item.unit}) - ₹${formatIndianCurrency(item.price * item.quantity)}\n`;
    });
    message += `\n`;

    message += `*Bill Details:*\n`;
    message += `Subtotal: ₹${formatIndianCurrency(subtotal)}\n`;
    message += `Tax (18%): ₹${formatIndianCurrency(subtotal * taxRate)}\n`;
    message += `*Total Payable: ₹${formatIndianCurrency(finalTotal)}*\n\n`;

    message += `*Delivery Method:*\n`;
    message += `${selectedDeliveryMethod === 'deliver' ? 'Deliver' : 'I will Pickup'}\n`;
    if (selectedDeliveryMethod === 'deliver') {
      message += `*Shipping Address:*\n${formData.shippingAddress}\n`;
    }

    const encodedMessage = encodeURIComponent(message);
    
    setWhatsappMessage(message);
    setWhatsappUrl(`https://wa.me/${sellerWhatsAppNumber}?text=${encodedMessage}`);
    setShowConfirmation(true);
  };

  const handleSendToWhatsApp = () => {
    window.open(whatsappUrl, '_blank');
    clearCart();
    form.reset();
    setShowConfirmation(false);
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
    <>
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
                  <p className="font-semibold text-lg">₹{formatIndianCurrency(item.price * item.quantity)}</p>
                  <div className="flex items-center justify-end gap-1 border rounded-md mt-1">
                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      step="any"
                      value={item.quantity}
                      onChange={(e) => updateCartItemQuantity(item.id, parseFloat(e.target.value) || 1)}
                      className="w-16 h-8 text-center border-0 focus-visible:ring-0"
                    />
                     <span className="text-sm text-muted-foreground pr-2">{item.unit}</span>
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
              <span>₹{formatIndianCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax (18%)</span>
              <span>₹{formatIndianCurrency(taxAmount)}</span>
            </div>
            <Separator />
             <div className="flex justify-between font-bold text-lg">
              <span>Payable</span>
              <span>₹{formatIndianCurrency(totalPayable)}</span>
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
                    prepareAndConfirmOrder('pickup');
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
                    form.handleSubmit(() => prepareAndConfirmOrder('deliver'))();
                  }}
              >
                  <p className="font-semibold">Deliver</p>
                  <p className="text-xs font-normal">Confirm Order</p>
              </Button>
            </div>
          </form>
         </Form>
      </div>

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Your Order</AlertDialogTitle>
            <AlertDialogDescription>
              Please review your order message below. Clicking "Send" will open WhatsApp with this message pre-filled.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="my-4 p-4 bg-muted rounded-md whitespace-pre-wrap text-sm">
            {whatsappMessage}
          </div>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSendToWhatsApp}>Send</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
