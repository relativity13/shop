
"use client";

import { Calendar, Repeat } from 'lucide-react';
import { orders as mockOrders } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { OrderItem } from '@/lib/types';

export function OrdersTab() {

  const handleRepeatOrder = (orderId: string) => {
    // In a real app, this would add the items from the selected order to the cart.
    console.log(`Repeating order: ${orderId}`);
    console.log(`The items from order #${orderId} have been added to your cart.`);
  };

  const getOrderTitle = (order: typeof mockOrders[0]) => {
    if (!order.items || order.items.length === 0) {
      return `Order #${order.id}`;
    }
    const firstItemName = order.items[0].name;
    if (order.items.length > 1) {
      return `${firstItemName} & more`;
    }
    return firstItemName;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Your Purchase History</h2>
        {mockOrders.length > 0 ? (
          <Accordion type="single" collapsible className="w-full space-y-4">
            {mockOrders.map((order) => (
              <AccordionItem value={order.id} key={order.id} className="bg-card border rounded-lg">
                <AccordionTrigger className="p-4 hover:no-underline">
                  <div className="flex justify-between w-full pr-4">
                    <div className="text-left">
                      <p className="font-bold text-primary">{getOrderTitle(order)}</p>
                      <p className="text-sm text-muted-foreground">Order #{order.id} - {order.status}</p>
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
                    {order.items.map((item: OrderItem) => (
                      <li key={item.id} className="flex items-center gap-4">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {item.quantity} {item.unit}
                          </p>
                        </div>
                        <p className="ml-auto font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => handleRepeatOrder(order.id)}
                    className="mt-4 w-full"
                    variant="outline"
                  >
                    <Repeat className="mr-2 h-4 w-4" />
                    Repeat Order
                  </Button>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
           <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">You have no past orders.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
