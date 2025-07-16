"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Lightbulb, Package, Calendar, Loader2 } from 'lucide-react';
import { orders as mockOrders } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { getProductRecommendations } from '@/ai/flows/product-recommendations';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function OrdersTab() {
  const { toast } = useToast();
  const [recommendations, setRecommendations] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGetRecommendations = async () => {
    setIsLoading(true);
    setRecommendations('');
    try {
      const orderHistoryString = mockOrders
        .map(
          (order) =>
            `Order ${order.id} on ${order.date}: ` +
            order.items.map((item) => `${item.quantity}x ${item.name}`).join(', ')
        )
        .join('; ');

      const result = await getProductRecommendations({ orderHistory: orderHistoryString });
      setRecommendations(result.recommendations);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to get AI recommendations. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <Card>
          <CardContent className="pt-6">
            <Button onClick={handleGetRecommendations} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Get Recommendations'
              )}
            </Button>
            {recommendations && (
              <Alert className="mt-4">
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>Recommendations For You!</AlertTitle>
                <AlertDescription>{recommendations}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {mockOrders.map((order) => (
            <AccordionItem value={order.id} key={order.id} className="bg-card border rounded-lg">
              <AccordionTrigger className="p-4 hover:no-underline">
                <div className="flex justify-between w-full pr-4">
                  <div className="text-left">
                    <p className="font-bold text-primary">Order #{order.id}</p>
                    <p className="text-sm text-muted-foreground">Status: {order.status}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${order.total.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 justify-end">
                      <Calendar className="w-4 h-4" />
                      {order.date}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 border-t">
                <h4 className="font-semibold mb-2">Items:</h4>
                <ul className="space-y-2">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex items-center gap-4">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded-md object-cover"
                        data-ai-hint={`${item.category}`}
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="ml-auto font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
