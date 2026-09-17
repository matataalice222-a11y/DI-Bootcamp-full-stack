// Define Person only once
type Person = {
  name: string;
  age: number;
};

type Address = {
  street: string;
  city: string;
};

type PersonWithAddress = Person & Address;

const employeeRecord: PersonWithAddress = {
  name: "Alice",
  age: 30,
  street: "123 Main St",
  city: "Springfield"
};


// Type guard example
function describeValue(value: number | string): string {
  if (typeof value === "number") {
    return "This is a number";
  } else {
    return "This is a string";
  }
}


// Safe type assertion example
let someValue: any = "Hello, TypeScript!";
let stringLength: number = (someValue as string).length;
console.log(stringLength); // 17


// Fix: return union instead of forcing string
function getFirstElement(arr: (number | string)[]): number | string {
  return arr[0];
}

// Testing with mixed arrays
console.log(getFirstElement(["Hello", 42])); // "Hello"
console.log(getFirstElement([100, "World"])); // 100


// Generic constraint with HasLength
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): void {
  console.log(item.length);
}

logLength("Hello World"); // 11
logLength([1, 2, 3, 4]); // 4


// Employee type combining Person + Job
type Job = {
  position: string;
  department: string;
};

type Employee = Person & Job;

function describeEmployee(employee: Employee): string {
  if (employee.position.toLowerCase() === "manager") {
    return `${employee.name} is a Manager in the ${employee.department} department.`;
  } else if (employee.position.toLowerCase() === "developer") {
    return `${employee.name} is a Developer in the ${employee.department} department.`;
  }
  return `${employee.name} works as a ${employee.position} in ${employee.department}.`;
}


// Fix: no unnecessary casting
interface HasToString {
  toString(): string;
}

function formatInput<T extends HasToString>(input: T): string {
  return input.toString().toUpperCase();
}

console.log(formatInput("hello")); // "HELLO"
console.log(formatInput(12345));   // "12345"
