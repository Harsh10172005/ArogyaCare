'use server';
import { chat } from '@/ai/flows/chat-flow';
import { diagnoseSkin } from '@/ai/flows/skin-diagnosis-flow';
import type { SkinDiagnosisInput, SkinDiagnosisOutput } from './schema';


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
