import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill, Hospital, Stethoscope, Bot, ArrowRight } from "lucide-react";

const features = [
  {
    title: "Order Medicines",
    description: "24/7 access to a wide range of medicines.",
    href: "/medicines",
    icon: Pill,
  },
  {
    title: "Nearby Hospitals",
    description: "Find emergency hospitals near your location.",
    href: "/hospitals",
    icon: Hospital,
  },
  {
    title: "Health Camps",
    description: "Register for free health check-up camps.",
    href: "/camps",
    icon: Stethoscope,
  },
  {
    title: "AI Health Assistant",
    description: "Get general health guidance from our AI.",
    href: "/ai-doctor",
    icon: Bot,
  },
];

export default function FeatureCards() {
  return (
    <section className="w-full py-16 sm:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Services</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Comprehensive healthcare services at your fingertips.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Link href={feature.href} key={feature.title} className="group">
              <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-transform duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
                  <feature.icon className="h-8 w-8 text-primary" />
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                  <div className="flex items-center mt-4 font-semibold text-primary group-hover:text-accent transition-colors">
                    Learn More <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform"/>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
