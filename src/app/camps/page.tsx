"use client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { camps } from "@/data/camps";
import { Stethoscope, Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CampsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="text-center mb-12">
          <Stethoscope className="mx-auto h-12 w-12 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-4">Upcoming Health Camps</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our free health camps across Delhi and take a proactive step towards a healthier life.
          </p>
      </div>
      <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
          {camps.map((camp) => (
              <Card key={camp.id} className="transition-all hover:shadow-lg">
              <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div>
                      <CardTitle className="text-xl flex items-center gap-3">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                              <Stethoscope className="h-6 w-6" />
                          </span>
                         {camp.title}
                      </CardTitle>
                  </div>
                   <Badge variant="secondary" className="border-primary/50 border">Free for All</Badge>
                  </div>
              </CardHeader>
              <CardContent className="space-y-3 ml-12 pl-1">
                  <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <p>{camp.location}</p>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  <p>{new Date(camp.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
              </CardContent>
              <CardFooter className="ml-12 pl-1">
                  <Button asChild>
                      <a href={camp.registrationLink} target="_blank" rel="noopener noreferrer">
                          Register Now
                      </a>
                  </Button>
              </CardFooter>
              </Card>
          ))}
          </div>
      </div>
    </div>
  );
}
