
'use client';

import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { LanguageContext } from '@/context/language-context';
import { CartContext } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Truck, CreditCard, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { placeOrderAction } from './actions';

const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().length(10, 'Phone number must be 10 digits'),
  address: z.string().min(10, 'Full address is required'),
  pincode: z.string().length(6, 'Pincode must be 6 digits'),
});

type CheckoutFormValues = z.infer<typeof formSchema>;

export default function CheckoutPage() {
  const { t } = useContext(LanguageContext);
  const { cart, getTotalPrice, clearCart } = useContext(CartContext);
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', phone: '', address: '', pincode: '' },
  });

  async function onSubmit(values: CheckoutFormValues) {
    setIsSubmitting(true);
    const result = await placeOrderAction(values);
    
    if (result.success) {
      toast({
        title: `${t('orderPlacedSuccessTitle')} ${values.name}!`,
        description: t('orderPlacedSuccessDesc'),
      });
      clearCart();
      router.push('/');
    } else {
       toast({
        title: t('error'),
        description: result.error || 'An unknown error occurred.',
        variant: 'destructive'
      });
    }
    setIsSubmitting(false);
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto max-w-lg px-4 py-20 text-center">
        <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground/30 mb-4" />
        <h1 className="text-2xl font-bold">{t('cartIsEmpty')}</h1>
        <p className="text-muted-foreground mt-2">{t('cartIsEmptyDesc')}</p>
        <Button asChild className="mt-6">
          <a href="/medicines">{t('shopNow')}</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="text-center mb-8">
        <Truck className="mx-auto h-12 w-12 text-primary" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-4">{t('checkoutTitle')}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{t('checkoutDesc')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{t('shippingDetails')}</span>
                 <Badge variant="secondary" className="border-green-500/50 text-green-700">{t('cashOnDelivery')}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('fullName')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('fullNamePlaceholder')} {...field} disabled={isSubmitting} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('phoneNumber')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('phoneNumberPlaceholder')} {...field} disabled={isSubmitting}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('shippingAddress')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('shippingAddressPlaceholder')} {...field} disabled={isSubmitting}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pincode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('pincode')}</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 110001" {...field} disabled={isSubmitting}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {t('placeOrder')} (₹{getTotalPrice().toFixed(2)})
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>{t('orderSummary')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-muted-foreground">
                      {t('quantity')}: {item.quantity}
                    </p>
                  </div>
                  <p>₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between items-center font-semibold text-lg">
                <p>{t('total')}</p>
                <p>₹{getTotalPrice().toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
