'use server';

/**
 * @fileOverview A product recommendation AI agent.
 *
 * - getProductRecommendations - A function that handles the product recommendation process.
 * - GetProductRecommendationsInput - The input type for the getProductRecommendations function.
 * - GetProductRecommendationsOutput - The return type for the getProductRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { products } from '@/lib/data';

const productNames = products.map(p => p.name);

const GetProductRecommendationsInputSchema = z.object({
  orderHistory: z.array(z.string()).describe('The list of product names in the user\'s order history.'),
});
export type GetProductRecommendationsInput = z.infer<typeof GetProductRecommendationsInputSchema>;

const RecommendedProductSchema = z.object({
    name: z.string().describe('The name of the recommended product.'),
    reason: z.string().describe('A short reason why this product is being recommended.'),
});

const GetProductRecommendationsOutputSchema = z.object({
  recommendations: z.array(RecommendedProductSchema).describe('The list of recommended products for the user based on their order history.'),
});
export type GetProductRecommendationsOutput = z.infer<typeof GetProductRecommendationsOutputSchema>;

export async function getProductRecommendations(input: GetProductRecommendationsInput): Promise<GetProductRecommendationsOutput> {
  if (!input.orderHistory.length) {
    return { recommendations: [] };
  }
  return getProductRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getProductRecommendationsPrompt',
  input: {schema: GetProductRecommendationsInputSchema},
  output: {schema: GetProductRecommendationsOutputSchema},
  prompt: `You are an expert product recommendation agent for a chemical supply company.
  Based on the user's order history, you will recommend other products that the user might be interested in.
  
  Available products: ${productNames.join(', ')}.

  User's Order History:
  {{#each orderHistory}}
  - {{{this}}}
  {{/each}}
  
  Recommend 3 products from the available product list that are not already in the user's order history.`,
});

const getProductRecommendationsFlow = ai.defineFlow(
  {
    name: 'getProductRecommendationsFlow',
    inputSchema: GetProductRecommendationsInputSchema,
    outputSchema: GetProductRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
