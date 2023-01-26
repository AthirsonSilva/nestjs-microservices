import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Products & Document;

@Schema()
export class Products {
  @Prop()
  id: number;

  @Prop()
  title: string;

  @Prop()
  image: string;

  @Prop()
  likes: string;
}

export const ProductSchema = SchemaFactory.createForClass(Products);
