
"use client";
import { useState, useEffect, useContext, Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { medicines } from "@/data/medicines";
import { Pill, ShoppingCart, Search, Package, Frown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { LanguageContext } from "@/context/language-context";
import { useToast } from "@/hooks/use-toast";
import { CartContext, type CartItem } from "@/context/cart-context";

function MedicinesSearch() {
  const { t } = useContext(LanguageContext);
  const { toast } = useToast();
  const { addToCart } = useContext(CartContext);
  const searchParams = useSearchParams();
  
  const initialQuery = searchParams.get('q') || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filteredMedicines, setFilteredMedicines] = useState(medicines);

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = medicines.filter(
      (medicine) =>
        medicine.name.toLowerCase().includes(lowercasedQuery) ||
        medicine.genericName.toLowerCase().includes(lowercasedQuery) ||
        t(medicine.type).toLowerCase().includes(lowercasedQuery)
    );
    setFilteredMedicines(filtered);
  }, [searchQuery, t]);

  const handleAddToCart = (medicine: CartItem) => {
    addToCart(medicine);
    toast({
      title: t('success'),
      description: `${medicine.name} ${t('addedToCart')}`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="text-center mb-8">
          <Pill className="mx-auto h-12 w-12 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-4">{t('orderMedicinesTitle')}</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('orderMedicinesDescPage')}
          </p>
      </div>
      <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder={`${t('searchForMedicines')}...`} 
                className="w-full pl-12 h-12 rounded-full" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
          </div>
      </div>
      {filteredMedicines.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMedicines.map((medicine) => (
            <Card key={medicine.id} className="flex flex-col group overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
                <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{medicine.name}</CardTitle>
                    <Package className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-sm text-muted-foreground">{medicine.genericName}</p>
                </CardHeader>
                <CardContent className="flex-grow">
                <p className="text-sm bg-secondary text-secondary-foreground inline-block px-2 py-1 rounded-full">{t(medicine.type)}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                <p className="text-xl font-bold text-primary">₹{medicine.price.toFixed(2)}</p>
                <Button onClick={() => handleAddToCart({ ...medicine, quantity: 1 })}>
                    <ShoppingCart className="mr-2 h-4 w-4" /> {t('addToCart')}
                </Button>
                </CardFooter>
            </Card>
            ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Frown className="mx-auto h-16 w-16 text-muted-foreground/50" />
          <h3 className="mt-4 text-xl font-semibold">No Medicines Found</h3>
          <p className="mt-2 text-muted-foreground">Your search for "{searchQuery}" did not match any products.</p>
        </div>
      )}
    </div>
  );
}

export default function MedicinesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MedicinesSearch />
    </Suspense>
  )
}
