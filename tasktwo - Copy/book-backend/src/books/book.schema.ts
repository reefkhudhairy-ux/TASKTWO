/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type BookDocument = Book & Document;

@Schema({timestamps: true})
export class Book {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  imageUrl: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
