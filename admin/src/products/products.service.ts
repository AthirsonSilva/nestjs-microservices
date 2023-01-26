import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsEntity } from './entities/products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly productsRepository: Repository<ProductsEntity>,
  ) {}

  async findAll(): Promise<ProductsEntity[]> {
    return await this.productsRepository.find();
  }

  async create(data) {
    return await this.productsRepository.save(data);
  }

  async findOne(id: number): Promise<ProductsEntity> {
    return await this.productsRepository.findOne({ where: { id } });
  }

  async update(id: number, data) {
    await this.productsRepository.update({ id }, data);
    return await this.productsRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    return await this.productsRepository.delete({ id });
  }

  async like(id: number) {
    const product = await this.productsRepository.findOne({ where: { id } });
    console.log(product);

    return await this.productsRepository.update(
      { id },
      { ...product, likes: product.likes + 1 },
    );
  }
}
