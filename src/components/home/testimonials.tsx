"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { testimonials } from "@/data/testimonials"
import { useLanguage } from "@/context/language-context"

export default function Testimonials() {
  const { t, language } = useLanguage();

  return (
    <section className="w-full py-16 sm:py-24 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t('testimonials.title')}</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t('testimonials.subtitle')}
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="h-full flex flex-col">
                    <CardContent className="flex flex-col items-center text-center p-6 flex-grow">
                      <p className="text-muted-foreground mb-6 flex-grow">"{language === 'en' ? testimonial.testimonial.en : testimonial.testimonial.hi}"</p>
                      <Avatar className="mb-4 h-16 w-16">
                        <AvatarImage src={testimonial.image} alt={testimonial.name} data-ai-hint="happy person" />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}
