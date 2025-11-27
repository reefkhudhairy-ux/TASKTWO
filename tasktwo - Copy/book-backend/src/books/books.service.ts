/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './book.schema';

@Injectable()
export class BookService {
  constructor(@InjectModel('Book') private bookModel: Model<any>) {}

  async findAll(): Promise<any[]> {
    return this.bookModel.find().exec();
  }

  async search(query: string): Promise<any[]> {
    if (!query) {
      return this.findAll();
    }
    const searchCondition = {
      $or: [{ name: query }],
    };

    console.log(' Condition:', JSON.stringify(searchCondition));
    const results = await this.bookModel.find(searchCondition).exec();
    console.log(` Search for "${query}" returned ${results.length} books.`);

    return results;
  }

  async create(bookData: any): Promise<any> {
    const newBook = new this.bookModel(bookData);
    return newBook.save();
  }

  async getBookById(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id).exec();

    if (!book) {
      throw new NotFoundException('الكتاب غير موجود');
    }
    return book;
  }
  // async deleteBook(id: string) {
  //   console.log('try to delete');
  //   const result = await this.bookModel.findById(id);
  //   console.log('found book', result);
  //   return this.bookModel.findByIdAndDelete(id);
  // }
  async deleteBook(id: string): Promise<void> {
    const result = await this.bookModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException('الكتاب غير موجودس');
    }
  }

  async updateBook(id: string, updatedData: any): Promise<Book | null> {
    return this.bookModel
      .findByIdAndUpdate(id, updatedData, { new: true })
      .exec();
  }
}
