import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductDocument, ProductModel } from './models/products.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(ProductModel.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async findAll() {
    return this.productModel.find().exec();
  }

  async create(createProductDto: CreateProductDto) {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findOne(id: string) {
    return this.productModel.findById(id).exec();
  }

  async update(id: string, updateProductDto: CreateProductDto) {
    return this.productModel
      .updateOne(
        {
          _id: id,
        },
        {
          $set: updateProductDto,
        },
      )
      .exec();
  }

  async remove(id: string) {
    return this.productModel.deleteOne({ _id: id }).exec();
  }
}
