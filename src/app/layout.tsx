import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';
import { LanguageProvider } from '@/context/language-context';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'ArogyaCare',
  description: 'Your complete healthcare companion.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(poppins.className, "min-h-screen bg-background font-sans antialiased")}>
        <LanguageProvider>
          <Header />
          <main className="flex-grow container mx-auto">
            {children}
          </main>
          <Footer />
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
