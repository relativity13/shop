
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import React from 'react';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { user as mockUser } from "@/lib/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  managerName: z.string().min(2, {
    message: "Manager name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, { message: "Please enter a valid 10-digit phone number." }),
  gstNumber: z.string().min(15, { message: "GST Number must be 15 characters." }).max(15, { message: "GST Number must be 15 characters." }),
  shippingAddress: z.string().min(10, {
    message: "Shipping address must be at least 10 characters.",
  }),
  sameAsShipping: z.boolean().default(false).optional(),
  billingAddress: z.string().min(10, {
    message: "Billing address must be at least 10 characters.",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileTab() {
  const { toast } = useToast();
  const { setTheme } = useTheme();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
        ...mockUser,
        sameAsShipping: false,
    },
    mode: "onChange",
  });

  const watchShippingAddress = form.watch("shippingAddress");
  const watchSameAsShipping = form.watch("sameAsShipping");

  React.useEffect(() => {
    if (watchSameAsShipping) {
      form.setValue("billingAddress", watchShippingAddress);
    } else {
        // If you want to clear it when unchecked:
        if (form.getValues("billingAddress") === watchShippingAddress) {
            form.setValue("billingAddress", mockUser.billingAddress);
        }
    }
  }, [watchSameAsShipping, watchShippingAddress, form]);


  function onSubmit(data: ProfileFormValues) {
    console.log(data);
    toast({
      title: "Profile Updated",
      description: "Your company profile information has been successfully updated.",
    });
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={mockUser.avatarUrl} alt={mockUser.name} data-ai-hint="company logo" />
              <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{mockUser.name}</CardTitle>
              <CardDescription>Manage your company profile settings here.</CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="managerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manager/Owner Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Manager or owner's name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input placeholder="contact@yourcompany.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Your company's phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gstNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GST Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Your company's GST number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                    <Input placeholder="Your company's billing address" {...field} disabled={watchSameAsShipping} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="sameAsShipping"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Billing address is the same as shipping address
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-accent hover:bg-accent/90">Update Profile</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
