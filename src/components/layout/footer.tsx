"use client";
import Link from "next/link";
import { useLanguage } from "@/context/language-context";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container py-12 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-8">
          <div className="sm:col-span-2 md:col-span-1 md:text-left md:pl-8">
            <Link href="/" className="mb-4 inline-block text-xl font-bold text-primary">
                ArogyaCare
            </Link>
            <p className="text-sm">{t('footer.tagline')}</p>
          </div>
          <div className="md:text-left md:pl-8">
            <h3 className="font-semibold text-foreground mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li><Link href="/medicines" className="hover:text-primary transition-colors">{t('footer.medicines')}</Link></li>
              <li><Link href="/hospitals" className="hover:text-primary transition-colors">{t('footer.hospitals')}</Link></li>
              <li><Link href="/camps" className="hover:text-primary transition-colors">{t('footer.healthCamps')}</Link></li>
              <li><Link href="/ai-doctor" className="hover:text-primary transition-colors">{t('footer.aiDoctor')}</Link></li>
            </ul>
          </div>
          <div className="md:text-left md:pl-8">
            <h3 className="font-semibold text-foreground mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-primary transition-colors">{t('footer.terms')}</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">{t('footer.privacy')}</Link></li>
            </ul>
          </div>
          <div className="md:text-left md:pl-8">
            <h3 className="font-semibold text-foreground mb-4">{t('footer.followUs')}</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-primary transition-colors">Facebook</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Twitter</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">LinkedIn</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-sm">
          <p>&copy; {new Date().getFullYear()} ArogyaCare. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
