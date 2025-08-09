
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useApp } from '@/context/AppContext';
import { WhatsappIcon } from './icons/WhatsappIcon';

type RequestType = 'sample' | 'new_product';

export function RequestTab() {
  const { openWhatsAppForRequest } = useApp();
  const [requestType, setRequestType] = useState<RequestType>('sample');
  const [productName, setProductName] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName) {
      // Basic validation
      alert('Please enter a product name.');
      return;
    }
    openWhatsAppForRequest(requestType, productName, details);
    // Reset form
    setProductName('');
    setDetails('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Make a Request</CardTitle>
        <CardDescription>
          Need a sample of an existing product or can't find what you're looking for? Let us know.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>What would you like to request?</Label>
            <RadioGroup
              value={requestType}
              onValueChange={(value: RequestType) => setRequestType(value)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sample" id="r-sample" />
                <Label htmlFor="r-sample">Request a Sample</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="new_product" id="r-new-product" />
                <Label htmlFor="r-new-product">Request a New Product</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-name">{requestType === 'sample' ? 'Product Name for Sample' : 'Requested Product Name'}</Label>
            <Input
              id="product-name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g., Caustic Soda Flakes"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="details">Additional Details (Optional)</Label>
            <Textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Provide any specific requirements, grade, or quantity needed..."
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            <WhatsappIcon />
            Send Request via WhatsApp
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

// You might need a Textarea component if it's not already in your UI library
// If not, you can create a simple one like this in components/ui/textarea.tsx

// import * as React from "react"
// import { cn } from "@/lib/utils"
// export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
// const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
//   ({ className, ...props }, ref) => {
//     return (
//       <textarea
//         className={cn(
//           "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
//           className
//         )}
//         ref={ref}
//         {...props}
//       />
//     )
//   }
// )
// Textarea.displayName = "Textarea"
// export { Textarea }
