import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ProductModel {
  @Prop()
  id: number;

  @Prop()
  title: string;

  @Prop()
  image: string;

  @Prop()
  likes: string;
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);
