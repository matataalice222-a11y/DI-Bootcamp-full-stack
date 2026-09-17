type User = {
  type: 'user';
  name: string;
  age: number;
};

type Product = {
  type: 'product';
  id: number;
  price: number;
};

type Order = {
  type: 'order';
  orderId: string;
  amount: number;
};

// A combined union type for the array input
type AppData = User | Product | Order;

function handleData(items: AppData[]): string[] {
  return items.map((item) => {
    // TypeScript uses the 'type' property as a discriminant to narrow types safely
    switch (item.type) {
      case 'user':
        return `Hello, ${item.name}! You are ${item.age} years old.`;
      
      case 'product':
        return `Product ID ${item.id} is priced at $${item.price.toFixed(2)}.`;
      
      case 'order':
        return `Order Summary [ID: ${item.orderId}]: Amounting to $${item.amount.toFixed(2)}.`;
      
      default:
        // Ensures exhaustive checking and handles unexpected runtime cases gracefully
        const exhaustiveCheck: never = item;
        return `Unknown data type encountered: ${JSON.stringify(exhaustiveCheck)}`;
    }
  });
}

// Example usage and testing:
const dataSample: AppData[] = [
  { type: 'user', name: 'Alice', age: 28 },
  { type: 'product', id: 101, price: 49.99 },
  { type: 'order', orderId: 'ORD-9876', amount: 150.50 }
];

console.log(handleData(dataSample));
// Output:
// [
//   "Hello, Alice! You are 28 years old.",
//   "Product ID 101 is priced at $49.99.",
//   "Order Summary [ID: ORD-9876]: Amounting to $150.50."
// ]