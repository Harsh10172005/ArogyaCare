


interface Order {
  id: string;
  name: string;
  phone: string;
  address: string;
  pincode: string;
  createdAt: Date;
}

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
    orders.unshift(newOrder); 
    return newOrder;
  },

  async getOrders(): Promise<Order[]> {
    
    return [...orders];
  },
};
