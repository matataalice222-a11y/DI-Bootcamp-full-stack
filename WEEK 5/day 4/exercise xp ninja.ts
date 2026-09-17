
class Container<T> {
  private items: T[] = [];

  // Adds an item to the container
  add(item: T): void {
    this.items.push(item);
  }

  // Removes an item from the container
  remove(item: T): void {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  // Returns all items in the container
  list(): T[] {
    return this.items;
  }
}

// Example usage combining intersection types with the Container class:
type Named = { name: string };
type Aged = { age: number };
type Person = Named & Aged;

const personContainer = new Container<Person>();
personContainer.add({ name: "Alice", age: 28 });
personContainer.add({ name: "Bob", age: 34 });

console.log(personContainer.list());


interface Response<T> {
  status: number;
  message: string;
  data: T;
}

function parseResponse<T>(rawResponse: any): T {
  // Type casting the raw data portion to the expected generic type T
  return rawResponse.data as T;
}

// Example usage:
interface UserData {
  id: number;
  username: string;
}

const apiResponse = {
  status: 200,
  message: "Success",
  data: { id: 1, username: "johndoe" }
};

const user = parseResponse<UserData>(apiResponse);
console.log(user.username); // "johndoe"


class Repository<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  retrieve(index: number): T {
    // Using type assertion to guarantee the return type safety
    return this.items[index] as T;
  }

  list(): T[] {
    return this.items as T[];
  }
}

// Example usage:
const stringRepo = new Repository<string>();
stringRepo.add("Document A");
stringRepo.add("Document B");

console.log(stringRepo.retrieve(0)); // "Document A"
console.log(stringRepo.list());     // ["Document A", "Document B"]

