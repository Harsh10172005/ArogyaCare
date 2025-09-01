import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full bg-secondary">
      <div className="container grid md:grid-cols-2 gap-16 items-center py-24 sm:py-32">
        <div className="space-y-6 text-center md:text-left p-4 md:p-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground tracking-tighter">
            Your Health, <br />
            Our Priority.
          </h1>
          <p className="max-w-xl mx-auto md:mx-0 text-lg lg:text-xl text-muted-foreground">
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
        <div className="relative flex justify-center items-center h-full">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl"></div>
            <Heart className="relative w-48 h-48 md:w-72 md:h-72 text-red-500 animate-beat" fill="currentColor" />
        </div>
      </div>
    </section>
  );
}
