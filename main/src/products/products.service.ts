import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Products } from './models/products.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name)
    private readonly productModel: Model<Products>,
  ) {}

  async findAll() {
    return this.productModel.find().exec();
  }

  async create(data): Promise<Products> {
    return new this.productModel(data).save();
  }

  async findOne(id: number): Promise<Products> {
    return await this.productModel.findById(id).exec();
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Products | any> {
    return this.productModel.findOneAndUpdate({ id }, updateProductDto).exec();
  }

  async remove(id: string) {
    return this.productModel.deleteOne({ _id: id }).exec();
  }

  async like(id: string) {
    return this.productModel
      .findOneAndUpdate({ _id: id }, { $inc: { likes: 1 } })
      .exec();
  }
}
