import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
        <div className="flex justify-center">
            <Image 
                src="https://picsum.photos/600/400" 
                alt="Doctor consulting a patient"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
                data-ai-hint="doctor patient"
            />
        </div>
      </div>
    </section>
  );
}
