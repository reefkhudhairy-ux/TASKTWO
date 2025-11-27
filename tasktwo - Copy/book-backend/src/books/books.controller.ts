/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  UploadedFile,
  UseInterceptors,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
  Patch,
  NotFoundException,
} from '@nestjs/common';
import { BookService } from './books.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Book } from './book.schema';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(@Body() bookData: any, @UploadedFile() file: any) {
    const imageUrl = file ? `/uploads/${file.filename}` : null;
    return this.bookService.create({ ...bookData, imageUrl: imageUrl });
  }

  @Get('search')
  async getBooks(@Query('q') searchQuery?: string): Promise<any[]> {
    console.log(searchQuery);
    if (searchQuery) {
      return this.bookService.search(searchQuery);
    }
    return this.bookService.findAll();
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBook(@Param('id') id: string) {
    return this.bookService.deleteBook(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async updateBook(@Param('id') id: string, @Body() updateBookData: any) {
    const updatedBook = await this.bookService.updateBook(id, updateBookData);

    if (!updatedBook) {
      throw new NotFoundException('حدث خطا');
    }
    return updatedBook;
  }

  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<Book> {
    return this.bookService.getBookById(id);
  }
}
