'use server';
import { chat } from '@/ai/flows/chat-flow';
import { diagnoseSkin } from '@/ai/flows/skin-diagnosis-flow';
import { z } from 'zod';

// Moved schemas and types here to comply with 'use server' constraints.
export const SkinDiagnosisInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a skin condition, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  description: z.string().optional().describe('An optional description of the skin condition.'),
});
export type SkinDiagnosisInput = z.infer<typeof SkinDiagnosisInputSchema>;

export const SkinDiagnosisOutputSchema = z.object({
  disease: z.string().describe("The name of the potential skin disease or condition. If unknown, say 'Unknown Condition'."),
  remedies: z.array(z.string()).describe("A list of suggested home remedies for the condition. This should be general advice and not prescriptive."),
  recommendation: z.string().describe("A recommendation for the user. If the condition appears serious or requires professional attention, strongly advise seeing a doctor. Otherwise, suggest monitoring the condition."),
  isSerious: z.boolean().describe("A boolean indicating if the condition appears to be serious and requires immediate medical attention."),
});
export type SkinDiagnosisOutput = z.infer<typeof SkinDiagnosisOutputSchema>;


export async function getAIResponse(query: string): Promise<{ response?: string; error?: string }> {
  if (!query || query.trim().length === 0) {
    return { error: 'Please enter a message.' };
  }

  try {
    const result = await chat({ message: query });
    return { response: result.response };
  } catch (error: any) {
    console.error('Error calling chat flow from action:', error);
    return { error: `AI service failed: ${error.message}. Please try again.` };
  }
}

export async function getSkinDiagnosis(input: SkinDiagnosisInput): Promise<{ response?: SkinDiagnosisOutput; error?: string }> {
  if (!input.photoDataUri) {
    return { error: 'Please upload an image.' };
  }
  
  try {
    const result = await diagnoseSkin(input);
    return { response: result };
  } catch (error: any)
  {
    console.error('Error calling skin diagnosis flow from action:', error);
    return { error: `AI service failed: ${error.message}. Please try again.` };
  }
}
