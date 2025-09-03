'use client';

import { useContext } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { CartContext } from '@/context/cart-context';
import { LanguageContext } from '@/context/language-context';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import Image from 'next/image';

export function CartSheet({ children }: { children: React.ReactNode }) {
  const { cart, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useContext(CartContext);
  const { t } = useContext(LanguageContext);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-6 w-6" />
            {t('yourCart')} ({cart.length})
          </SheetTitle>
        </SheetHeader>
        <Separator />
        {cart.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center">
            <ShoppingCart className="h-24 w-24 text-muted-foreground/30 mb-4" />
            <p className="text-lg font-semibold">{t('cartIsEmpty')}</p>
            <p className="text-sm text-muted-foreground">{t('cartIsEmptyDesc')}</p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-grow -mx-6">
              <div className="px-6 space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden bg-muted">
                       <Package className="h-8 w-8 text-muted-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <div className="flex-grow">
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">₹{item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-4 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <SheetFooter className="mt-auto">
                <div className="w-full space-y-4">
                    <Separator />
                    <div className="flex justify-between items-center font-bold text-lg">
                        <span>{t('total')}</span>
                        <span>₹{getTotalPrice().toFixed(2)}</span>
                    </div>
                     <Button className="w-full" size="lg">{t('checkout')}</Button>
                     <Button variant="outline" className="w-full" onClick={clearCart}>{t('clearCart')}</Button>
                </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

const Package = (props: React.ComponentProps<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v2" />
    <path d="M21 14v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="M3 10h18" />
    <path d="M12 10v12" />
  </svg>
)
