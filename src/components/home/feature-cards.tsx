"use client";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill, Hospital, Stethoscope, Bot, ArrowRight } from "lucide-react";
import { useContext } from "react";
import { LanguageContext } from "@/context/language-context";

export default function FeatureCards() {
  const { t } = useContext(LanguageContext);
  const features = [
    {
      titleKey: "orderMedicines",
      descriptionKey: "orderMedicinesDesc",
      href: "/medicines",
      icon: Pill,
    },
    {
      titleKey: "nearbyHospitals",
      descriptionKey: "nearbyHospitalsDesc",
      href: "/hospitals",
      icon: Hospital,
    },
    {
      titleKey: "healthCamps",
      descriptionKey: "healthCampsDesc",
      href: "/camps",
      icon: Stethoscope,
    },
    {
      titleKey: "aiHealthAssistant",
      descriptionKey: "aiHealthAssistantDesc",
      href: "/ai-doctor",
      icon: Bot,
    },
  ];

  return (
    <section className="w-full py-16 sm:py-24 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t('ourServices')}</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t('ourServicesDesc')}
          </p>
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Link href={feature.href} key={feature.titleKey} className="group">
                <Card className="h-full shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-semibold">{t(feature.titleKey)}</CardTitle>
                    <feature.icon className="h-8 w-8 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{t(feature.descriptionKey)}</p>
                    <div className="flex items-center mt-4 font-semibold text-primary group-hover:text-accent-foreground transition-colors">
                      {t('learnMore')} <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform"/>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
