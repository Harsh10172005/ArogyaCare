
'use server';

import { generateDietPlan } from '@/ai/flows/diet-planner-flow';
import type { DietPlannerInput, DietPlanOutput } from './schema';

export async function getDietPlan(input: DietPlannerInput): Promise<{ response?: DietPlanOutput; error?: string }> {
  try {
    const result = await generateDietPlan(input);
    return { response: result };
  } catch (error: any) {
    console.error('Error calling diet planner flow from action:', error);
    return { error: `AI service failed: ${error.message}. Please try again.` };
  }
}
