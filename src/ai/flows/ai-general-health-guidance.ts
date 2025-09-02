// Use server directive.
'use server';

/**
 * @fileOverview Provides general health guidance using an AI chatbot.
 *
 * - aiGeneralHealthGuidance - A function that processes user health-related questions and returns informative responses.
 * - AIGeneralHealthGuidanceInput - The input type for the aiGeneralHealthGuidance function.
 * - AIGeneralHealthGuidanceOutput - The return type for the aiGeneralHealthGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

const AIGeneralHealthGuidanceInputSchema = z.object({
  query: z.string().describe('The user health-related question.'),
});
export type AIGeneralHealthGuidanceInput = z.infer<
  typeof AIGeneralHealthGuidanceInputSchema
>;

const AIGeneralHealthGuidanceOutputSchema = z.object({
  response: z.string().describe('The AI chatbot informative response.'),
});
export type AIGeneralHealthGuidanceOutput = z.infer<
  typeof AIGeneralHealthGuidanceOutputSchema
>;

export async function aiGeneralHealthGuidance(
  input: AIGeneralHealthGuidanceInput
): Promise<AIGeneralHealthGuidanceOutput> {
  return aiGeneralHealthGuidanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiGeneralHealthGuidancePrompt',
  input: {schema: AIGeneralHealthGuidanceInputSchema},
  output: {schema: AIGeneralHealthGuidanceOutputSchema},
  model: googleAI('gemini-pro'),
  prompt: `You are a helpful AI chatbot providing general health guidance.

  Respond to the following user question with an informative response:
  {{query}}`,
});

const aiGeneralHealthGuidanceFlow = ai.defineFlow(
  {
    name: 'aiGeneralHealthGuidanceFlow',
    inputSchema: AIGeneralHealthGuidanceInputSchema,
    outputSchema: AIGeneralHealthGuidanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
