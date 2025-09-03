
"use client";

import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getDietPlan } from './actions';
import type { DietPlanOutput } from './schema';
import { Loader2, ChefHat, Leaf, Fish, Target, Info, WheatOff } from 'lucide-react';
import { LanguageContext } from "@/context/language-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const formSchema = z.object({
  dietType: z.enum(['vegetarian', 'non-vegetarian', 'vegan']),
  healthGoal: z.enum(['weight-loss', 'muscle-gain', 'maintenance']),
  allergies: z.string().optional(),
  notes: z.string().optional()
});

type DietFormValues = z.infer<typeof formSchema>;

export default function DietPlannerPage() {
  const { t } = useContext(LanguageContext);
  const [dietPlan, setDietPlan] = useState<DietPlanOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<DietFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dietType: 'vegetarian',
      healthGoal: 'maintenance',
      allergies: '',
      notes: ''
    },
  });

  async function onSubmit(values: DietFormValues) {
    setIsLoading(true);
    setError(null);
    setDietPlan(null);

    const result = await getDietPlan(values);
    
    if (result.response) {
      setDietPlan(result.response);
    } else {
      setError(result.error || t('errorDietPlan'));
    }
    
    setIsLoading(false);
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <div className="text-center mb-8">
        <ChefHat className="mx-auto h-12 w-12 text-primary" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-4">{t('dietPlannerTitle')}</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {t('dietPlannerDesc')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 h-fit">
          <CardHeader>
            <CardTitle>{t('yourPreferences')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="dietType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="flex items-center gap-2"><Leaf /> {t('dietaryPreference')}</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="vegetarian" /></FormControl>
                            <FormLabel className="font-normal">{t('vegetarian')}</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="non-vegetarian" /></FormControl>
                            <FormLabel className="font-normal">{t('nonVegetarian')}</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="vegan" /></FormControl>
                            <FormLabel className="font-normal">{t('vegan')}</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="healthGoal"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="flex items-center gap-2"><Target /> {t('healthGoal')}</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="weight-loss" /></FormControl>
                            <FormLabel className="font-normal">{t('weightLoss')}</FormLabel>
                          </FormItem>
                           <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="maintenance" /></FormControl>
                            <FormLabel className="font-normal">{t('weightMaintenance')}</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="muscle-gain" /></FormControl>
                            <FormLabel className="font-normal">{t('muscleGain')}</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="allergies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><WheatOff /> {t('allergies')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('allergiesPlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><Info /> {t('otherNotes')}</FormLabel>
                      <FormControl>
                        <Textarea placeholder={t('otherNotesPlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {t('generatePlan')}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          {isLoading && (
             <Card className="flex flex-col items-center justify-center h-full min-h-[500px]">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
                <p className="mt-4 text-muted-foreground">{t('generatingDietPlan')}</p>
            </Card>
          )}
          {error && <Card className="flex items-center justify-center h-full min-h-[500px] bg-destructive/10 border-destructive text-destructive-foreground p-4"><p>{error}</p></Card>}
          {dietPlan && (
            <Card>
              <CardHeader>
                <CardTitle>{t('yourWeeklyDietPlan')}</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="monday" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 sm:grid-cols-7">
                    {Object.keys(dietPlan).map(day => (
                      <TabsTrigger key={day} value={day}>{t(day)}</TabsTrigger>
                    ))}
                  </TabsList>
                  {Object.entries(dietPlan).map(([day, meals]) => (
                    <TabsContent key={day} value={day}>
                      <div className="space-y-4 pt-4">
                        <MealCard title={t('breakfast')} meal={meals.breakfast} />
                        <MealCard title={t('lunch')} meal={meals.lunch} />
                        <MealCard title={t('dinner')} meal={meals.dinner} />
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function MealCard({ title, meal }: { title: string, meal: string }) {
  return (
    <Card className="bg-muted/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{meal}</p>
      </CardContent>
    </Card>
  )
}
