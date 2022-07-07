import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Request, Response } from 'express';
import { BookDTO } from './book.dto';

@Controller('/books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getBooks(@Res() res: Response) {
    const books = this.bookService.getBooks();

    res.status(HttpStatus.OK).json(books);
  }

  @Get(':id')
  getBook(@Param('id') id: string, @Res() res: Response) {
    const book = this.bookService.getBook(id);

    console.log(book);
    res.status(HttpStatus.OK).json(book);
  }

  @Post()
  createBook(@Body() book: BookDTO, @Res() res: Response) {
    const id = this.bookService.createBook(book);

    res.status(HttpStatus.CREATED).json({ id: id });
  }

  @Put(':id')
  updateBook(
    @Body() book: BookDTO,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const newBook = this.bookService.updateBook(id, book);

    res.status(HttpStatus.OK).json(newBook);
  }

  @Delete(':id')
  removeBook(@Param('id') id: string, @Res() res: Response) {
    const removed = this.bookService.removeBook(id);

    res.status(HttpStatus.OK).json(removed);
  }
}
