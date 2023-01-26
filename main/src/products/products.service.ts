import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductDocument, Products } from './models/products.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name)
    private readonly Products: Model<ProductDocument>,
  ) {}

  async findAll() {
    return this.Products.find().exec();
  }

  async create(createProductDto: CreateProductDto) {
    const createdProduct = new this.Products(createProductDto);
    return createdProduct.save();
  }

  async findOne(id: string) {
    return this.Products.findById(id).exec();
  }

  async update(id: string, updateProductDto: CreateProductDto) {
    return this.Products.updateOne(
      {
        _id: id,
      },
      {
        $set: updateProductDto,
      },
    ).exec();
  }

  async remove(id: string) {
    return this.Products.deleteOne({ _id: id }).exec();
  }
}
