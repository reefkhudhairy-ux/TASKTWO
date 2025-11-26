/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModule } from './books/books.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://mongo:27017/bookdb'), BookModule],
})
export class AppModule {}
