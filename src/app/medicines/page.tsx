"use client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { medicines } from "@/data/medicines";
import { Pill, ShoppingCart, Search, Package } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/language-context";

export default function MedicinesPage() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="text-center mb-8">
          <Pill className="mx-auto h-12 w-12 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-4">{t('medicines.title')}</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('medicines.subtitle')}
          </p>
      </div>
      <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder={`${t('medicines.searchPlaceholder')}...`} className="w-full pl-12 h-12 rounded-full" />
          </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {medicines.map((medicine) => (
          <Card key={medicine.id} className="flex flex-col group overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
              <CardHeader>
              <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{medicine.name}</CardTitle>
                  <Package className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="text-sm text-muted-foreground">{medicine.genericName}</p>
              </CardHeader>
              <CardContent className="flex-grow">
              <p className="text-sm bg-secondary text-secondary-foreground inline-block px-2 py-1 rounded-full">{medicine.type}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
              <p className="text-xl font-bold text-primary">₹{medicine.price.toFixed(2)}</p>
              <Button>
                  <ShoppingCart className="mr-2 h-4 w-4" /> {t('medicines.addToCart')}
              </Button>
              </CardFooter>
          </Card>
          ))}
      </div>
    </div>
  );
}
