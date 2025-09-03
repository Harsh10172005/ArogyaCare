"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Search,
  ShoppingCart,
  ChevronDown,
  Menu,
  Pill,
  Hospital,
  Stethoscope,
  Bot,
  X,
  Languages,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useState, useContext } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LanguageContext } from "@/context/language-context";

export default function Header() {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t } = useContext(LanguageContext);

  const navLinks = [
    { href: "/medicines", labelKey: "medicines", icon: Pill },
    { href: "/hospitals", labelKey: "hospitals", icon: Hospital },
    { href: "/camps", labelKey: "healthCamps", icon: Stethoscope },
    { href: "/ai-doctor", labelKey: "aiDoctor", icon: Bot },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary p-2">
            <Image src="https://i.postimg.cc/TYGz1K8b/arogya_care.png" alt="ArogyaCare Logo" width={32} height={32} />
            ArogyaCare
          </Link>

          <nav className="hidden md:flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium">
                  {t('healthcareServices')} <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {navLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link href={link.href} className="flex items-center gap-2">
                      <link.icon className="h-4 w-4" />
                      {t(link.labelKey)}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              {t('offers')}
            </Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder={`${t('search')}...`} className="w-48 pl-10" />
          </div>
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Languages className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => setLanguage('en')} disabled={language === 'en'}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setLanguage('hi')} disabled={language === 'hi'}>
                  हिन्दी
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Button>
          <Button asChild>
            <Link href="/login">{t('login')}</Link>
          </Button>
        </div>

        <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-sm">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                 <Link href="/" onClick={() => setSheetOpen(false)} className="flex items-center gap-2 text-xl font-bold text-primary">
                    <Image src="https://i.postimg.cc/TYGz1K8b/arogya_care.png" alt="ArogyaCare Logo" width={32} height={32} />
                    ArogyaCare
                 </Link>
                 <SheetClose asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </SheetClose>
              </div>
              <nav className="flex flex-col gap-4 p-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setSheetOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-md p-2 text-lg font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                      pathname === link.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                    )}
                  >
                    <link.icon className="h-5 w-5" />
                    {t(link.labelKey)}
                  </Link>
                ))}
                 <Link
                    href="#"
                    onClick={() => setSheetOpen(false)}
                    className="flex items-center gap-3 rounded-md p-2 text-lg font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    {t('offers')}
                  </Link>
              </nav>
              <div className="mt-auto p-4 border-t flex flex-col gap-4">
                 <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full">
                       <Languages className="mr-2 h-5 w-5" /> {language === 'en' ? 'English' : 'हिन्दी'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-[calc(100%-2rem)]">
                    <DropdownMenuItem onSelect={() => setLanguage('en')} disabled={language === 'en'}>
                      English
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setLanguage('hi')} disabled={language === 'hi'}>
                      हिन्दी
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button asChild><Link href="/login" onClick={() => setSheetOpen(false)}>{t('login')}</Link></Button>
                <Button variant="ghost" size="icon" className="self-center">
                    <ShoppingCart className="h-6 w-6" />
                    <span className="sr-only">Cart</span>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
