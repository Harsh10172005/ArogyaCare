'use server';
import { chat } from '@/ai/flows/chat-flow';

export async function getAIResponse(query: string): Promise<{ response?: string; error?: string }> {
  if (!query || query.trim().length === 0) {
    return { error: 'Please enter a message.' };
  }

  try {
    const result = await chat({ message: query });
    return { response: result.response };
  } catch (error: any) {
    console.error('Error calling chat flow from action:', error);
    // Return a more specific error message to the client
    return { error: `AI service failed: ${error.message}. Please try again.` };
  }
}
