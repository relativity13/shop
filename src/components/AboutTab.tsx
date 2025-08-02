
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Mail, Phone, Globe, MessageCircle, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { companyInfo } from '@/lib/data';

export function AboutTab() {
  const { setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="text-left">
              <CardTitle className="text-3xl font-bold">About Us</CardTitle>
              <CardDescription className="text-muted-foreground mt-1">{companyInfo.tagline}</CardDescription>
            </div>
            <div className="flex gap-2 flex-shrink-0">
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
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-left text-muted-foreground pt-4 border-t">
            {companyInfo.about}
          </p>
          
          <div className="border-t pt-4 space-y-2">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-muted-foreground" />
              <p>{companyInfo.address}</p>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <p>{companyInfo.email}</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <p>{companyInfo.phoneNumber}</p>
            </div>
             <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-muted-foreground" />
              <p>{companyInfo.website}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
