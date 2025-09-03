
'use server';

import { OrderService } from '@/services/order-service';
import type { z } from 'zod';

// In a real app, you would define the schema here or import it.
// For now, we'll accept any form data.
// import { formSchema } from './page';
// type CheckoutFormValues = z.infer<typeof formSchema>;

interface OrderResult {
  success: boolean;
  orderId?: string;
  error?: string;
}

export async function placeOrderAction(formData: any): Promise<OrderResult> {
  console.log("--- NEW ORDER RECEIVED ON SERVER ---");
  console.log("Customer Name:", formData.name);
  console.log("Phone Number:", formData.phone);
  console.log("Shipping Address:", formData.address);
  console.log("Pincode:", formData.pincode);
  console.log("------------------------------------");

  try {
    const newOrder = await OrderService.createOrder(formData);
    return { success: true, orderId: newOrder.id };
  } catch (error: any) {
    console.error("Error saving order:", error);
    return { success: false, error: "Failed to save the order." };
  }
}
