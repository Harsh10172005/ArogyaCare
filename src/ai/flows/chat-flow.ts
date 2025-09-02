'use server';
/**
 * @fileOverview A simple AI chat flow.
 *
 * - chat - A function that takes a user's message and returns an AI response.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatInputSchema = z.object({
  message: z.string().describe("The user's message."),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  response: z.string().describe("The AI's response."),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    try {
      const llmResponse = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest',
        prompt: `You are a helpful AI health assistant called ArogyaCare. Provide informative and safe general health guidance. Do not provide medical advice. Be friendly and conversational. Respond to the following message: ${input.message}`,
      });

      const responseText = llmResponse.text;
      if (!responseText) {
          console.error('AI response text is empty.');
          throw new Error('AI response was empty.');
      }
      
      return { response: responseText };

    } catch (e: any) {
        console.error("Error within chatFlow:", e);
        // Re-throw the error to be caught by the action
        throw new Error(`Flow failed: ${e.message}`);
    }
  }
);
