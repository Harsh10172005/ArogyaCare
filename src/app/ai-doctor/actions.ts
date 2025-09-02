'use server';
import { chat } from '@/ai/flows/chat-flow';

export async function getAIResponse(query: string): Promise<{ response?: string; error?: string }> {
  if (!query || query.trim().length === 0) {
    return { error: 'Please enter a message.' };
  }

  try {
    const result = await chat({ message: query });
    return { response: result.response };
  } catch (error) {
    console.error('AI Error:', error);
    return { error: 'An unexpected error occurred. Please try again.' };
  }
}
