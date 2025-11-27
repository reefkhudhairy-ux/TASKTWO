import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookController } from './books.controller';
import { BookService } from './books.service';
import { Book, BookSchema } from './book.schema';
import { MulterModule } from '@nestjs/platform-express/multer';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService],
})
export class BookModule {}
