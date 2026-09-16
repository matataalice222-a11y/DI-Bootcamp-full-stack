// 1. Interface Book
interface Book {
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  genre?: string; // Optional property
}

// 2. Class Library
class Library {
  // Private property to store books
  private books: Book[] = [];

  // Public method to add a book
  public addBook(book: Book): void {
    this.books.push(book);
  }

  // Public method to get a book's details by its ISBN
  public getBookDetails(isbn: string): Book | undefined {
    return this.books.find((book) => book.isbn === isbn);
  }

  // Protected helper so subclasses can access books array if needed
  protected getBooks(): Book[] {
    return this.books;
  }
}

// 3. Class DigitalLibrary extending Library
class DigitalLibrary extends Library {
  public readonly website: string;

  constructor(website: string) {
    super();
    this.website = website;
  }

  // Public method to list all book titles
  public listBooks(): string[] {
    // Accessing books via the parent class's protected method
    return this.getBooks().map((book) => book.title);
  }
}

// --- Testing the Implementation ---

// Create an instance of DigitalLibrary
const myDigitalLibrary = new DigitalLibrary("https://www.my-digitallibrary.com");

// Add some books
myDigitalLibrary.addBook({
  title: "The Hobbit",
  author: "J.R.R. Tolkien",
  isbn: "978-0547928227",
  publishedYear: 1937,
  genre: "Fantasy"
});

myDigitalLibrary.addBook({
  title: "1984",
  author: "George Orwell",
  isbn: "978-0451524935",
  publishedYear: 1949
  // genre is optional and omitted here
});

// Print out the list of all book titles
console.log("--- All Book Titles ---");
console.log(myDigitalLibrary.listBooks());
// Output: [ 'The Hobbit', '1984' ]

// Print out details of a specific book using its ISBN
console.log("\n--- Book Details for ISBN 978-0547928227 ---");
const bookDetails = myDigitalLibrary.getBookDetails("978-0547928227");
if (bookDetails) {
  console.log(`Title: ${bookDetails.title}`);
  console.log(`Author: ${bookDetails.author}`);
  console.log(`Published Year: ${bookDetails.publishedYear}`);
  if (bookDetails.genre) {
    console.log(`Genre: ${bookDetails.genre}`);
  }
}

// Print library website
console.log(`\nLibrary Website: ${myDigitalLibrary.website}`);