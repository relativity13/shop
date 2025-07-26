
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getProductRecommendations, GetProductRecommendationsOutput } from '@/ai/flows/product-recommendations';
import { useApp } from '@/context/AppContext';
import { products as allProducts } from '@/lib/data';
import { Sparkles, ShoppingCart } from 'lucide-react';

export function RecommendationsTab() {
  const { wishlist, cart, addToCart } = useApp();
  const [recommendations, setRecommendations] = useState<GetProductRecommendationsOutput['recommendations']>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = async () => {
    setLoading(true);
    setError(null);
    try {
      // We can use wishlist or cart as order history. Let's use both.
      const orderHistory = [...new Set([...wishlist.map(i => i.name), ...cart.map(i => i.name)])];
      
      if (orderHistory.length === 0) {
        setRecommendations([]);
        return;
      }
      
      const result = await getProductRecommendations({ orderHistory });
      const recommendedProductsWithDetails = result.recommendations.map(rec => {
        const productDetails = allProducts.find(p => p.name === rec.name);
        return {
          ...rec,
          ...productDetails,
        };
      });
      setRecommendations(recommendedProductsWithDetails);

    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setError("Sorry, we couldn't fetch recommendations at this time.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch recommendations when the tab is first rendered or when cart/wishlist changes
    fetchRecommendations();
  }, [wishlist, cart]);

  const handleAddToCart = (product: any) => {
    if (product.price === undefined) return;
    addToCart(product, 1); // Add 1 unit by default
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <CardTitle className="text-2xl">Recommended For You</CardTitle>
        </div>
        <CardDescription>Based on your activity, here are some products you might like.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading && (
          <div className="flex justify-center items-center py-8">
            <p>Thinking of some recommendations...</p>
          </div>
        )}
        {error && <p className="text-destructive text-center">{error}</p>}
        
        {!loading && !error && recommendations.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No recommendations for you yet.</p>
            <p className="text-sm text-muted-foreground">Add items to your cart or wishlist to get started!</p>
          </div>
        )}

        {!loading && !error && recommendations.length > 0 && (
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <Card key={index} className="transition-shadow duration-300 hover:shadow-lg">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold">{rec.name}</h3>
                    <p className="text-sm text-muted-foreground italic mt-1">"{rec.reason}"</p>
                  </div>
                  {rec.price !== undefined ? (
                    <Button onClick={() => handleAddToCart(rec)}>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  ) : (
                     <p className="text-sm font-semibold text-primary">Price on request</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
