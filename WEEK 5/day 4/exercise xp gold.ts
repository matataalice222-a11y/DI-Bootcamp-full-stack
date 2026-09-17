
interface User {
  name: string;
  email: string;
}

interface Admin {
  adminLevel: number;
}

type AdminUser = User & Admin;

function getProperty(obj: AdminUser, propertyName: string): any {
  // Using the `in` operator as a type guard to check if the property exists
  if (propertyName in obj) {
    return obj[propertyName as keyof AdminUser];
  }
  return undefined;
}

// Example usage:
const sampleAdmin: AdminUser = {
  name: "Alice",
  email: "alice@example.com",
  adminLevel: 2
};

console.log(getProperty(sampleAdmin, "name"));       // "Alice"
console.log(getProperty(sampleAdmin, "adminLevel")); // 2
console.log(getProperty(sampleAdmin, "phone"));      // undefined


// A generic function using a constructor type to cast and return the value
function castToType<T>(value: any, targetType: new (...args: any[]) => T): T {
  return new targetType(value);
}

// Example usage:
// Casting a string to a Number object
const numObj = castToType("12345", Number);
console.log(numObj.valueOf()); // 12345 (number)

// Casting a string/value to a Boolean object
const boolObj = castToType("true", Boolean);
console.log(boolObj.valueOf()); // true (boolean)


// Constraining T to arrays containing numbers or strings
function getArrayLength<T extends (number | string)[]>(arr: T): number {
  // Using a type assertion to reinforce the expected array type safely
  return (arr as (number | string)[]).length;
}

// Example usage:
const numArray = [10, 20, 30, 40];
const stringArray = ["apple", "banana", "cherry"];

console.log(getArrayLength(numArray));    // 4
console.log(getArrayLength(stringArray)); // 3


interface StorageInterface<T> {
  add(item: T): void;
  get(index: number): T | undefined;
}

class Box<T> implements StorageInterface<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  get(index: number): T | undefined {
    return this.items[index];
  }
}

// Example usage:
const stringBox = new Box<string>();
stringBox.add("Laptop");
stringBox.add("Mouse");
console.log(stringBox.get(0)); // "Laptop"

const numberBox = new Box<number>();
numberBox.add(100);
console.log(numberBox.get(0)); // 100


interface Item<T> {
  value: T;
}

// Constraining T so that items managed must comply with the Item structure
class Queue<T> {
  private queue: Item<T>[] = [];

  add(item: Item<T>): void {
    this.queue.push(item);
  }

  remove(): Item<T> | undefined {
    // Shifts the first element out of the queue (FIFO)
    return this.queue.shift();
  }
}

// Example usage:
const stringQueue = new Queue<string>();
stringQueue.add({ value: "First Task" });
stringQueue.add({ value: "Second Task" });

console.log(stringQueue.remove()); // { value: 'First Task' }
console.log(stringQueue.remove()); // { value: 'Second Task' }

