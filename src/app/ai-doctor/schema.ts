import { z } from 'zod';

// This file is dedicated to holding schema definitions and types,
// so it does not contain 'use server' and can be imported safely anywhere.

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