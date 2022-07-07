import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Response } from 'express';
import { Book } from './book.schema';

@Controller('/books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getBooks(@Res() res: Response) {
    const books = await this.bookService.getBooks();

    res.status(HttpStatus.OK).json(books);
  }

  @Get(':id')
  async getBook(@Param('id') id: string, @Res() res: Response) {
    const book = await this.bookService.getBook(id);

    res.status(HttpStatus.OK).json(book);
  }

  @Post()
  async createBook(@Body() book: Book, @Res() res: Response) {
    const created = await this.bookService.createBook(book);

    res.status(HttpStatus.CREATED).json({ id: created._id });
  }

  @Put(':id')
  async updateBook(
    @Body() book: Book,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const newBook = await this.bookService.updateBook(id, book);

    res.status(HttpStatus.OK).json(newBook);
  }

  @Delete(':id')
  async removeBook(@Param('id') id: string, @Res() res: Response) {
    const removed = await this.bookService.removeBook(id);

    res.status(HttpStatus.OK).json(removed);
  }
}
