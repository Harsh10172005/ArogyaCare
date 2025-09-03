
"use client";
import React, { useContext, useMemo } from "react";
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { hospitals } from "@/data/hospitals";
import { Hospital, MapPin, Phone } from "lucide-react";
import { LanguageContext } from "@/context/language-context";

export default function HospitalsPage() {
  const { t } = useContext(LanguageContext);

  // Stably import the map component using useMemo to prevent re-initialization on re-renders.
  const HospitalMap = useMemo(() => dynamic(
    () => import('@/components/hospitals/hospital-map'),
    { 
      loading: () => <div className="h-[400px] w-full rounded-md bg-muted flex items-center justify-center"><p>Loading map...</p></div>,
      ssr: false 
    }
  ), []);

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="text-center mb-12">
        <Hospital className="mx-auto h-12 w-12 text-primary" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-4">{t('nearbyHospitalsTitle')}</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('nearbyHospitalsDescPage')}
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <HospitalMap />

        <div className="space-y-6 mt-8">
          {hospitals.map((hospital) => (
            <Card key={hospital.id} className="transition-all hover:shadow-lg">
              <CardHeader className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex-grow">
                  <CardTitle className="text-xl flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Hospital className="h-6 w-6" />
                      </span>
                      {hospital.name}
                  </CardTitle>
                  <p className="text-sm bg-primary/10 text-primary font-semibold inline-block px-3 py-1 rounded-full mt-3 ml-12">{t(hospital.type)}</p>
                </div>
                <Button variant="outline" className="mt-2 sm:mt-0 w-full sm:w-auto" asChild>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${hospital.latitude},${hospital.longitude}`} target="_blank" rel="noopener noreferrer">
                    {t('viewOnMap')}
                  </a>
                </Button>
              </CardHeader>
              <CardContent className="ml-12 pl-1 pt-0">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <p>{hospital.address}</p>
                </div>
                 <div className="flex items-center text-muted-foreground mt-2">
                  <Phone className="h-4 w-4 mr-2" />
                  <p>+91 11-2658-8500 ({t('sample')})</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
