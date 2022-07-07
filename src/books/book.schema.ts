import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  authors: string;

  @Prop()
  favorite: string;

  @Prop()
  fileCover: string;

  @Prop()
  fileName: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
