/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

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
}
