
class Employee {
  protected name: string;
  protected salary: number;

  constructor(name: string, salary: number) {
    this.name = name;
    this.salary = salary;
  }

  public getDetails(): string {
    return `Name: ${this.name}, Salary: ${this.salary}`;
  }
}

class Manager extends Employee {
  public department: string;

  constructor(name: string, salary: number, department: string) {
    super(name, salary);
    this.department = department;
  }

  public override getDetails(): string {
    return `Name: ${this.name}, Salary: ${this.salary}, Department: ${this.department}`;
  }
}

// Creating a new instance and calling getDetails()
const manager = new Manager("Alice", 85000, "Engineering");
console.log(manager.getDetails());


class Car {
  public readonly make: string;
  private readonly model: string;
  public year: number;

  constructor(make: string, model: string, year: number) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  public getCarDetails(): string {
    return `Make: ${this.make}, Model: ${this.model}, Year: ${this.year}`;
  }
}

const myCar = new Car("Toyota", "Corolla", 2022);
console.log(myCar.getCarDetails());

// Attempting to modify readonly properties results in TypeScript errors:
// myCar.make = "Honda";  // Error: Cannot assign to 'make' because it is a read-only property.
// myCar.model = "Civic"; // Error: Cannot assign to 'model' because it is a read-only property.

// Modifying the non-readonly property works fine:
myCar.year = 2023;


class MathUtils {
  public static PI: number = 3.14159;

  public static circumference(radius: number): number {
    return 2 * MathUtils.PI * radius;
  }
}

// Calling the static method directly without creating an instance
console.log(MathUtils.circumference(5)); // Output: 31.4159


interface Operation {
  execute(a: number, b: number): number;
}

class Addition implements Operation {
  public execute(a: number, b: number): number {
    return a + b;
  }
}

class Multiplication implements Operation {
  public execute(a: number, b: number): number {
    return a * b;
  }
}

const addOp = new Addition();
console.log(addOp.execute(5, 3)); // Output: 8

const multOp = new Multiplication();
console.log(multOp.execute(5, 3)); // Output: 15


interface Shape {
  color: string;
  getArea(): number;
}

interface Rectangle extends Shape {
  readonly width: number;
  readonly height: number;
  getPerimeter(): number;
}

class CustomRectangle implements Rectangle {
  public color: string;
  public readonly width: number;
  public readonly height: number;

  constructor(color: string, width: number, height: number) {
    this.color = color;
    this.width = width;
    this.height = height;
  }

  public getArea(): number {
    return this.width * this.height;
  }

  public getPerimeter(): number {
    return 2 * (this.width + this.height);
  }
}

// Example usage:
const rect = new CustomRectangle("blue", 10, 5);
console.log(`Color: ${rect.color}`);
console.log(`Area: ${rect.getArea()}`);
console.log(`Perimeter: ${rect.getPerimeter()}`);

