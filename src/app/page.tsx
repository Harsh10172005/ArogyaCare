import FeatureCards from '@/components/home/feature-cards';
import Hero from '@/components/home/hero';
import Testimonials from '@/components/home/testimonials';
import WellnessSection from '@/components/home/wellness-section';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <FeatureCards />
      <WellnessSection />
      <Testimonials />
    </div>
  );
}
