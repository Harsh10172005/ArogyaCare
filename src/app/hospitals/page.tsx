import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { hospitals } from "@/data/hospitals";
import { Hospital, MapPin } from "lucide-react";

export default function HospitalsPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Nearby Hospitals</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Find emergency and specialized hospitals near you.
        </p>
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="space-y-6">
          {hospitals.map((hospital) => (
            <Card key={hospital.id}>
              <CardHeader>
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                        <Hospital className="h-6 w-6 text-primary" />
                        {hospital.name}
                    </CardTitle>
                    <p className="text-sm bg-accent text-accent-foreground inline-block px-2 py-1 rounded-full mt-2">{hospital.type}</p>
                  </div>
                  <Button variant="outline">View on Map</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <p>{hospital.address}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
