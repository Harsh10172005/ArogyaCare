"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, TestTube, HeartPulse } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/context/language-context";

export default function WellnessSection() {
  const { t } = useLanguage();

  const wellnessData = {
    nutrition: {
        title: t('wellness.nutrition.title'),
        description: t('wellness.nutrition.description'),
        image: "https://media.istockphoto.com/id/947378396/vector/healthy-eating-plate.jpg?s=612x612&w=0&k=20&c=GoX0WK0I6GrY6NLYliDmxOBS2GMrus2VSi4deTrXoG0=",
        hint: "healthy food"
    },
    supplements: {
        title: t('wellness.supplements.title'),
        description: t('wellness.supplements.description'),
        image: "https://health.drmorepen.com/cdn/shop/articles/a-guide-to-nutrition-supplements-for-your-health-233967_cf4b7655-fada-4fd6-a0c8-dd1132718a3e.webp?v=1738819094",
        hint: "vitamins pills"
    },
    healthyHabits: {
        title: t('wellness.healthyHabits.title'),
        description: t('wellness.healthyHabits.description'),
        image: "https://assets.clevelandclinic.org/m/5e7e5b52c28ee023/webimage-exerciseHowOften-944015592-770x533-1_jpg.png",
        hint: "beating heart"
    }
}

  return (
    <section className="w-full py-16 sm:py-24 bg-secondary">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t('wellness.title')}</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t('wellness.subtitle')}
          </p>
        </div>
        <Tabs defaultValue="nutrition" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="nutrition" className="flex items-center gap-2"><Leaf className="h-4 w-4"/> {t('wellness.nutrition.tab')}</TabsTrigger>
            <TabsTrigger value="supplements" className="flex items-center gap-2"><TestTube className="h-4 w-4"/> {t('wellness.supplements.tab')}</TabsTrigger>
            <TabsTrigger value="healthyHabits" className="flex items-center gap-2"><HeartPulse className="h-4 w-4"/> {t('wellness.healthyHabits.tab')}</TabsTrigger>
          </TabsList>
          
          <div className="mt-8">
            <TabsContent value="nutrition">
              <WellnessContent {...wellnessData.nutrition} />
            </TabsContent>
            <TabsContent value="supplements">
              <WellnessContent {...wellnessData.supplements} />
            </TabsContent>
            <TabsContent value="healthyHabits">
              <WellnessContent {...wellnessData.healthyHabits} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
}

function WellnessContent({ title, description, image, hint }: { title: string, description: string, image: string, hint: string }) {
    return (
        <Card className="overflow-hidden">
            <div className="grid md:grid-cols-2 items-center">
                <div className="p-8 space-y-4">
                    <h3 className="text-2xl font-bold text-primary">{title}</h3>
                    <p className="text-muted-foreground">{description}</p>
                </div>
                <div className="relative h-96">
                    <Image 
                        src={image} 
                        alt={title}
                        fill
                        className="object-cover"
                        data-ai-hint={hint}
                    />
                </div>
            </div>
        </Card>
    )
}
