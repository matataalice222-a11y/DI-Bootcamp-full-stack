
class Employee {
  public name: string;
  private age: number;
  protected salary: number;

  constructor(name: string, age: number, salary: number) {
    this.name = name;
    this.age = age;
    this.salary = salary;
  }

  protected calculateBonus(): number {
    return this.salary * 0.10; // 10% bonus
  }

  public getSalaryDetails(): string {
    return `Base Salary: ${this.salary}`;
  }
}

class Manager extends Employee {
  constructor(name: string, age: number, salary: number) {
    super(name, age, salary);
  }

  public override getSalaryDetails(): string {
    const bonus = this.calculateBonus();
    return `Salary: ${this.salary}, Bonus: ${bonus}, Total: ${this.salary + bonus}`;
  }
}

class ExecutiveManager extends Manager {
  constructor(name: string, age: number, salary: number) {
    super(name, age, salary);
  }

  public approveBudget(amount: number): string {
    return `Executive Manager ${this.name} approved a budget of $${amount}.`;
  }
}

// Creating an instance of ExecutiveManager
const exec = new ExecutiveManager("Alice", 40, 120000);
console.log(exec.name);                // Accessible (public)
console.log(exec.getSalaryDetails());  // Accessible (calls protected method via inheritance)
console.log(exec.approveBudget(50000));// Accessible (new method)

// Encapsulation checks (will cause TypeScript compilation errors if uncommented):
// console.log(exec.age);               // Error: 'age' is private
// console.log(exec.salary);            // Error: 'salary' is protected
// console.log(exec.calculateBonus());  // Error: 'calculateBonus' is protected



class Shape {
  public static totalShapes: number = 0;

  constructor() {
    // Increment totalShapes count whenever any shape instance is created
    Shape.totalShapes++;
  }

  public static getType(): string {
    return "Generic Shape";
  }

  public calculateArea(): number {
    return 0;
  }
}

class Circle extends Shape {
  public radius: number;

  constructor(radius: number) {
    super();
    this.radius = radius;
  }

  public static override getType(): string {
    return "Circle";
  }

  public override calculateArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class Square extends Shape {
  public side: number;

  constructor(side: number) {
    super();
    this.side = side;
  }

  public static override getType(): string {
    return "Square";
  }

  public override calculateArea(): number {
    return this.side * this.side;
  }
}

// Testing instances and static members
const circle = new Circle(5);
const square = new Square(4);

console.log(Circle.getType());          // Output: Circle
console.log(`Circle Area: ${circle.calculateArea()}`);

console.log(Square.getType());          // Output: Square
console.log(`Square Area: ${square.calculateArea()}`);

console.log(`Total Shapes Created: ${Shape.totalShapes}`); // Output: 2


interface Calculator {
  a: number;
  b: number;
  operate(fn: (x: number, y: number) => number): number;
}

class AdvancedCalculator implements Calculator {
  public a: number;
  public b: number;

  constructor(a: number, b: number) {
    this.a = a;
    this.b = b;
  }

  public operate(fn: (x: number, y: number) => number): number {
    return fn(this.a, this.b);
  }

  // Helper methods to pass into operate
  public add = (x: number, y: number) => x + y;
  public subtract = (x: number, y: number) => x - y;
  public multiply = (x: number, y: number) => x * y;
}

// Example usage:
const calc = new AdvancedCalculator(10, 5);

console.log("Addition:", calc.operate(calc.add));          // Output: 15
console.log("Subtraction:", calc.operate(calc.subtract));    // Output: 5
console.log("Multiplication:", calc.operate(calc.multiply)); // Output: 50



class Device {
  public readonly serialNumber: string;

  constructor(serialNumber: string) {
    this.serialNumber = serialNumber;
  }

  public getDeviceInfo(): string {
    return `Serial Number: ${this.serialNumber}`;
  }
}

class Laptop extends Device {
  public model: string;
  public price: number;

  constructor(serialNumber: string, model: string, price: number) {
    super(serialNumber);
    this.model = model;
    this.price = price;
  }

  public override getDeviceInfo(): string {
    return `Serial Number: ${this.serialNumber}, Model: ${this.model}, Price: $${this.price}`;
  }
}

// Testing the class
const myLaptop = new Laptop("SN123456789", "MacBook Pro", 1999);

// Immutable property check:
// myLaptop.serialNumber = "NEW_SN"; // Error: Cannot assign to 'serialNumber' because it is a read-only property.

// Mutable properties can be updated:
myLaptop.model = "MacBook Pro M3";
myLaptop.price = 2199;

console.log(myLaptop.getDeviceInfo()); // Output: Serial Number: SN123456789, Model: MacBook Pro M3, Price: $2199

interface Product {
  readonly name: string;
  price: number;
  discount?: number; // Optional property
}

interface Electronics extends Product {
  warrantyPeriod: string; // in months/years
}

class Smartphone implements Electronics {
  public readonly name: string;
  public price: number;
  public discount?: number;
  public warrantyPeriod: string;

  constructor(name: string, price: number, warrantyPeriod: string, discount?: number) {
    this.name = name;
    this.price = price;
    this.warrantyPeriod = warrantyPeriod;
    if (discount !== undefined) {
      this.discount = discount;
    }
  }

  public calculateFinalPrice(): number {
    if (this.discount) {
      return this.price - (this.price * (this.discount / 100));
    }
    return this.price;
  }
}

// Example usage:
const phone = new Smartphone("iPhone 15", 1000, "12 Months", 15);

console.log(`Product: ${phone.name}`);
console.log(`Original Price: $${phone.price}`);
console.log(`Discount: ${phone.discount}%`);
console.log(`Final Price: $${phone.calculateFinalPrice()}`);
console.log(`Warranty: ${phone.warrantyPeriod}`);

// phone.name = "Android"; // Error: Cannot assign to 'name' because it is a read-only property.

