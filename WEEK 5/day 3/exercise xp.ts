
class Employee {
  private name: string;
  private salary: number;
  public position: string;
  protected department: string;

  constructor(name: string, salary: number, position: string, department: string) {
    this.name = name;
    this.salary = salary;
    this.position = position;
    this.department = department;
  }

  public getEmployeeInfo(): string {
    return `Employee Name: ${this.name}, Position: ${this.position}`;
  }
}


class Product {
  readonly id: number;
  public name: string;
  public price: number;

  constructor(id: number, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  public getProductInfo(): string {
    return `Product: ${this.name}, Price: $${this.price}`;
  }
}

// Testing the class and the readonly property constraint
const product = new Product(1, "Laptop", 999.99);
console.log(product.getProductInfo());

// Attempting to modify the id property results in a TypeScript compilation error:
// product.id = 2; // Error: Cannot assign to 'id' because it is a read-only property.


class Animal {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  public makeSound(): string {
    return "Some generic animal sound";
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }

  public override makeSound(): string {
    return "bark";
  }
}

// Creating an instance and calling the method
const myDog = new Dog("Buddy");
console.log(myDog.makeSound()); // Output: bark



class Calculator {
  public static add(a: number, b: number): number {
    return a + b;
  }

  public static subtract(a: number, b: number): number {
    return a - b;
  }
}

// Calling static methods without instantiating the Calculator class
console.log(Calculator.add(10, 5));      // Output: 15
console.log(Calculator.subtract(10, 5)); // Output: 5



interface User {
  readonly id: number;
  name: string;
  email: string;
}

interface PremiumUser extends User {
  membershipLevel?: string;
}

function printUserDetails(user: PremiumUser): void {
  console.log(`ID: ${user.id}`);
  console.log(`Name: ${user.name}`);
  console.log(`Email: ${user.email}`);
  if (user.membershipLevel) {
    console.log(`Membership Level: ${user.membershipLevel}`);
  }
}

// Example usage:
const user1: PremiumUser = {
  id: 101,
  name: "Jane Doe",
  email: "jane@example.com",
  membershipLevel: "Gold"
};

printUserDetails(user1);
