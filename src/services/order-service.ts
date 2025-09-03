
// This is a simple in-memory store to simulate a database for orders.
// In a real application, you would use a proper database like Firestore.

interface Order {
  id: string;
  name: string;
  phone: string;
  address: string;
  pincode: string;
  createdAt: Date;
}

// Using a global variable to persist data across requests in a dev environment.
// Note: This will reset when the server restarts.
const globalForOrders = global as unknown as { orders: Order[] };

if (!globalForOrders.orders) {
  globalForOrders.orders = [];
}

const orders: Order[] = globalForOrders.orders;

export const OrderService = {
  async createOrder(data: { name: string; phone: string; address: string; pincode: string }): Promise<Order> {
    const newOrder: Order = {
      id: `order_${Math.random().toString(36).substr(2, 9)}`,
      ...data,
      createdAt: new Date(),
    };
    orders.unshift(newOrder); // Add to the beginning of the array
    return newOrder;
  },

  async getOrders(): Promise<Order[]> {
    // Return a copy to prevent direct mutation
    return [...orders];
  },
};
