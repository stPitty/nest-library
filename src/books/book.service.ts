import { Injectable } from '@nestjs/common';
import { BookDTO } from './book.dto';

@Injectable()
export class BookService {
  private readonly books: BookDTO[] = [];

  getBooks(): BookDTO[] {
    return this.books;
  }

  getBook(id: string): BookDTO | null {
    return this.books.find((book) => {
      return book.id == id || null;
    });
  }

  createBook(book: BookDTO): string {
    this.books.push(book);
    return book.id;
  }

  updateBook(id: string, updatedBook: BookDTO): BookDTO {
    const book = this.getBook(id);
    const bookIndex = this.findBookIndex(book);

    const newBook = {
      ...book,
      ...updatedBook,
    };
    this.books[bookIndex] = newBook;

    return newBook;
  }

  removeBook(id: string): BookDTO {
    const book = this.getBook(id);
    const bookIndex = this.findBookIndex(book);
    this.books.splice(bookIndex, 1);

    return book;
  }

  findBookIndex(book: BookDTO): number | null {
    return this.books.indexOf(book);
  }
}
