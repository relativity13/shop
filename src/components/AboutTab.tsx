
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Mail, Phone, Globe } from 'lucide-react';
import { companyInfo } from '@/lib/data';

export function AboutTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="text-left">
              <CardTitle className="text-3xl font-bold">About Us</CardTitle>
              <CardDescription className="text-muted-foreground mt-1">{companyInfo.tagline}</CardDescription>
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
