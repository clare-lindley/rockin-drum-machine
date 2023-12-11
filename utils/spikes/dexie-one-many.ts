import Dexie, { Table } from 'dexie';

// Define the Book interface
export interface Book {
  id?: number;
  title: string;
  authorId: number; // Foreign key referencing the Author
}

// Define the Author interface
export interface Author {
  id?: number;
  name: string;
  books?: Book[]; // Optional array to store books for convenience
}

// Create the Dexie database
class LibraryDatabase extends Dexie {
  authors!: Table<Author>; // Table for authors
  books!: Table<Book>;     // Table for books

  constructor() {
    super('LibraryDatabase');

    // Define the database schema
    this.version(1).stores({
      authors: '++id,name',
      books: '++id,title,authorId',
    });

    // Optional: Create an index on books for authorId for faster queries
    this.books.createIndex('authorId', 'authorId');
  }
}

// Instantiate the database
const libraryDB = new LibraryDatabase();

// Example of how to use the database:

// Add an author with books
libraryDB.transaction('rw', libraryDB.authors, libraryDB.books, async () => {
  // Add an author
  const authorId = await libraryDB.authors.add({ name: 'J.K. Rowling' });

  // Add books associated with the author - lol Chat GPT can't quite get the titles correct!
  const book1Id = await libraryDB.books.add({ title: 'Harry Potter and the Sorcerer\'s Stone', authorId });
  const book2Id = await libraryDB.books.add({ title: 'Harry Potter and the Chamber of Secrets', authorId });

  console.log(`Author and Books added with IDs: ${authorId}, ${book1Id}, ${book2Id}`);

  // Retrieve books for a specific author
  const authorWithBooks = await libraryDB.authors.get(authorId);
  if (authorWithBooks) {
    console.log(`Author: ${authorWithBooks.name}`);
    console.log('Books:', authorWithBooks.books);
  }
}).catch((error) => {
  console.error(error);
});
