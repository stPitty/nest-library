import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './book.schema';
import { Model } from 'mongoose';
import { IBookDto } from './book.dto';
import { retry } from 'rxjs';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private bookRepository: Model<BookDocument>,
  ) {}

  async getBooks(): Promise<Book[]> {
    return this.bookRepository.find().select('-__v');
  }

  async getBook(id: string): Promise<Book> {
    return this.bookRepository.findById(id).select('-__v');
  }

  async createBook(book: Book): Promise<IBookDto> {
    return this.bookRepository.create(book);
  }

  async updateBook(id: string, book: Book): Promise<Book> {
    await this.bookRepository.findByIdAndUpdate(id, book).select('-__v');

    return this.getBook(id);
  }

  async removeBook(id: string): Promise<Book> {
    return this.bookRepository.findByIdAndDelete(id).select('-__v');
  }
}
