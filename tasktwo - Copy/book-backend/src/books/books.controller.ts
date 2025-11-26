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
} from '@nestjs/common';
import { BookService } from './books.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}
v
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
}
