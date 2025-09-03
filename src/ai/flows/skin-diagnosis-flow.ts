'use server';
/**
 * @fileOverview A skin disease diagnosis AI agent.
 *
 * - diagnoseSkin - A function that handles the skin diagnosis process.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import type { SkinDiagnosisInput, SkinDiagnosisOutput } from '@/app/ai-doctor/actions';

// The schemas are now imported inside the flow function to avoid circular dependencies.

export async function diagnoseSkin(input: SkinDiagnosisInput): Promise<SkinDiagnosisOutput> {
  return skinDiagnosisFlow(input);
}

const skinDiagnosisFlow = ai.defineFlow(
  {
    name: 'skinDiagnosisFlow',
    // We import the schemas dynamically inside the flow to break the circular dependency.
    inputSchema: z.lazy(() => import('@/app/ai-doctor/actions').then(m => m.SkinDiagnosisInputSchema)),
    outputSchema: z.lazy(() => import('@/app/ai-doctor/actions').then(m => m.SkinDiagnosisOutputSchema)),
  },
  async (input) => {
    // We need to get the schema definitions for the prompt.
    const { SkinDiagnosisInputSchema, SkinDiagnosisOutputSchema } = await import('@/app/ai-doctor/actions');
    
    const prompt = ai.definePrompt({
      name: 'skinDiagnosisPrompt',
      input: { schema: SkinDiagnosisInputSchema },
      output: { schema: SkinDiagnosisOutputSchema },
      prompt: `You are an expert dermatologist AI. A user has provided a photo of a skin condition and an optional description. 
      
      Your task is to:
      1. Analyze the image and description to identify a potential skin disease.
      2. Suggest some general, safe home remedies. These should not be presented as cures but as potential ways to alleviate symptoms.
      3. Based on the visual evidence, determine if the condition looks serious. 
      4. Provide a clear recommendation. If it appears serious, inflammatory, or unusual, you MUST strongly recommend visiting a doctor for a proper diagnosis. Otherwise, suggest monitoring and seeking medical advice if it worsens.
    
      IMPORTANT: You are an AI assistant, not a real doctor. Start your recommendation with a disclaimer: "This is not a medical diagnosis. Please consult a healthcare professional for an accurate assessment."
    
      User's Description: {{{description}}}
      Photo of skin condition: {{media url=photoDataUri}}`,
    });

    const { output } = await prompt(input);
    if (!output) {
      throw new Error("The AI model did not return a valid output.");
    }
    return output;
  }
);
