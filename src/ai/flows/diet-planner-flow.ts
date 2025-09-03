
'use server';
/**
 * @fileOverview An AI-powered diet planner.
 *
 * - generateDietPlan - A function that creates a personalized diet plan.
 */

import { ai } from '@/ai/genkit';
import { DietPlannerInputSchema, DietPlanOutputSchema, type DietPlannerInput, type DietPlanOutput } from '@/app/diet-planner/schema';

export async function generateDietPlan(input: DietPlannerInput): Promise<DietPlanOutput> {
  return dietPlannerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dietPlannerPrompt',
  model: 'googleai/gemini-1.5-flash-latest',
  input: { schema: DietPlannerInputSchema },
  output: { schema: DietPlanOutputSchema },
  prompt: `You are an expert nutritionist and diet planner. A user has provided their health preferences. Your task is to generate a balanced and healthy 7-day diet plan tailored to their needs.

  **User's Preferences:**
  - **Diet Type:** {{{dietType}}}
  - **Health Goal:** {{{healthGoal}}}
  - **Allergies:** {{#if allergies}}"{{{allergies}}}"{{else}}"None specified"{{/if}}
  - **Other Notes/Conditions:** {{#if notes}}"{{{notes}}}"{{else}}"None specified"{{/if}}

  **Instructions:**
  1.  Create a varied and interesting meal plan for 7 days (Monday to Sunday).
  2.  For each day, provide suggestions for breakfast, lunch, and dinner.
  3.  Ensure the plan aligns with the user's diet type (vegetarian, non-vegetarian, vegan).
  4.  The meal suggestions should be appropriate for Indian cuisine, but easily understandable.
  5.  Take into account the user's health goal. For weight loss, suggest lighter meals. For muscle gain, include more protein.
  6.  Crucially, AVOID any ingredients the user is allergic to.
  7.  Pay attention to any other notes, like diabetes (suggest low-GI foods) or preference for low-spice food.
  8.  The output must be in the specified JSON format with keys for each day of the week. Do not include any extra commentary before or after the JSON.
  `,
});

const dietPlannerFlow = ai.defineFlow(
  {
    name: 'dietPlannerFlow',
    inputSchema: DietPlannerInputSchema,
    outputSchema: DietPlanOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error("The AI model did not return a valid diet plan.");
    }
    return output;
  }
);
