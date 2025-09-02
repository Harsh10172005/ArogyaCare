import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";

export default function Hero() {
  return (
    <section className="w-full bg-secondary">
      <div className="container grid md:grid-cols-2 gap-16 items-center py-24 sm:py-32">
        <div className="space-y-6 text-center md:text-left p-4 md:p-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tighter">
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
        <div className="relative flex justify-center items-center h-60">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
                <Heart className="h-24 w-24 text-primary/80 fill-primary/20 animate-beat mb-4" />
                <svg
                    viewBox="0 0 400 150"
                    className="w-full h-auto"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <path
                        d="M0,75 C20,75 30,30 40,75 C50,120 60,75 70,75 L120,75 L125,50 L130,100 L135,25 L140,75 L400,75"
                        stroke="hsl(var(--primary))"
                        strokeWidth="4"
                        fill="none"
                        className="animate-pulse-line"
                        strokeLinecap="round"
                    />
                </svg>
            </div>
        </div>
      </div>
    </section>
  );
}
