'use server';
import { aiGeneralHealthGuidance } from '@/ai/flows/ai-general-health-guidance';

export async function getAIResponse(query: string): Promise<{ response?: string; error?: string }> {
  if (!query || query.trim().length === 0) {
    return { error: 'Please enter a message.' };
  }

  try {
    const result = await aiGeneralHealthGuidance({ query });
    return { response: result.response };
  } catch (error) {
    console.error('AI Error:', error);
    return { error: 'An unexpected error occurred. Please try again.' };
  }
}
