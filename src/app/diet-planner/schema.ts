
import { z } from 'zod';

export const DietPlannerInputSchema = z.object({
  dietType: z.enum(['vegetarian', 'non-vegetarian', 'vegan']).describe("User's dietary preference."),
  healthGoal: z.enum(['weight-loss', 'muscle-gain', 'maintenance']).describe("User's primary health goal."),
  allergies: z.string().optional().describe("A list of allergies the user has, e.g., 'peanuts, gluten'."),
  notes: z.string().optional().describe("Any other health conditions or preferences, e.g., 'diabetic, prefers low-spice food'.")
});
export type DietPlannerInput = z.infer<typeof DietPlannerInputSchema>;

const MealSchema = z.object({
  breakfast: z.string().describe("A suggestion for breakfast for that day."),
  lunch: z.string().describe("A suggestion for lunch for that day."),
  dinner: z.string().describe("A suggestion for dinner for that day."),
});

export const DietPlanOutputSchema = z.object({
    monday: MealSchema,
    tuesday: MealSchema,
    wednesday: MealSchema,
    thursday: MealSchema,
    friday: MealSchema,
    saturday: MealSchema,
    sunday: MealSchema,
});
export type DietPlanOutput = z.infer<typeof DietPlanOutputSchema>;
