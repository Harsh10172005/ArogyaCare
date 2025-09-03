"use client";
import Link from "next/link";
import { useContext } from "react";
import { LanguageContext } from "@/context/language-context";

export default function Footer() {
  const { t } = useContext(LanguageContext);
  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container mx-auto py-12 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-8">
          <div className="sm:col-span-2 md:col-span-1 md:text-left md:pl-8">
            <Link href="/" className="mb-4 inline-block text-xl font-bold text-primary">
                ArogyaCare
            </Link>
            <p className="text-sm">{t('footerSlogan')}</p>
          </div>
          <div className="md:text-left md:pl-8">
            <h3 className="font-semibold text-foreground mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li><Link href="/medicines" className="hover:text-primary transition-colors">{t('medicines')}</Link></li>
              <li><Link href="/hospitals" className="hover:text-primary transition-colors">{t('hospitals')}</Link></li>
              <li><Link href="/camps" className="hover:text-primary transition-colors">{t('healthCamps')}</Link></li>
              <li><Link href="/ai-doctor" className="hover:text-primary transition-colors">{t('aiDoctor')}</Link></li>
            </ul>
          </div>
          <div className="md:text-left md:pl-8">
            <h3 className="font-semibold text-foreground mb-4">{t('legal')}</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-primary transition-colors">{t('termsOfService')}</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">{t('privacyPolicy')}</Link></li>
            </ul>
          </div>
          <div className="md:text-left md:pl-8">
            <h3 className="font-semibold text-foreground mb-4">{t('followUs')}</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-primary transition-colors">Facebook</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Twitter</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">LinkedIn</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-sm">
          <p>&copy; {new Date().getFullYear()} ArogyaCare. {t('allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
}
