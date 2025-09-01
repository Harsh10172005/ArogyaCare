import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";

export default function Hero() {
  return (
    <section className="w-full bg-secondary">
      <div className="container grid md:grid-cols-2 gap-8 items-center py-12 sm:py-24">
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground tracking-tighter">
            Your Health, <br />
            Our Priority.
          </h1>
          <p className="max-w-xl mx-auto md:mx-0 text-lg text-muted-foreground">
            ArogyaCare offers a seamless healthcare experience, from ordering medicines to consulting with our AI-powered health assistant.
          </p>
          <div className="flex justify-center md:justify-start">
            <Button asChild size="lg">
              <Link href="/ai-doctor">
                Ask our AI Doctor <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-center items-center h-full">
            <Heart className="w-48 h-48 md:w-64 md:h-64 text-primary animate-beat" fill="currentColor" />
        </div>
      </div>
    </section>
  );
}
