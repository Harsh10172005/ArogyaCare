import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { medicines } from "@/data/medicines";
import { Pill, ShoppingCart } from "lucide-react";

export default function MedicinesPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Order Medicines</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Browse our wide range of medicines and get them delivered to your doorstep.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {medicines.map((medicine) => (
          <Card key={medicine.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{medicine.name}</CardTitle>
                <Pill className="h-6 w-6 text-accent" />
              </div>
              <p className="text-sm text-muted-foreground">{medicine.genericName}</p>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm bg-secondary text-secondary-foreground inline-block px-2 py-1 rounded-full">{medicine.type}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <p className="text-xl font-bold text-primary">₹{medicine.price.toFixed(2)}</p>
              <Button>
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
