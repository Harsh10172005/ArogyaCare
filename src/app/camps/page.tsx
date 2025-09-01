import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { camps } from "@/data/camps";
import { Stethoscope, Calendar, MapPin } from "lucide-react";

export default function CampsPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Upcoming Health Camps</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Join our free health camps and take a step towards a healthier life.
        </p>
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="space-y-6">
          {camps.map((camp) => (
            <Card key={camp.id}>
              <CardHeader>
                <div className="flex justify-between items-start gap-4">
                  <div>
                     <CardTitle className="text-xl flex items-center gap-2">
                        <Stethoscope className="h-6 w-6 text-primary" />
                        {camp.title}
                     </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <p>{camp.location}</p>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  <p>{new Date(camp.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </CardContent>
              <CardFooter>
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
