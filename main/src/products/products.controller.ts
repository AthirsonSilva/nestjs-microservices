import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @EventPattern('products_fetched')
  async handleProductsFetched(data: any) {
    return {
      products: data,
    };
  }

  @EventPattern('product_created')
  async handleProductCreated(product: any) {
    this.productService.create({
      id: product.id,
      title: product.title,
      image: product.image,
      likes: product.likes,
    });
  }

  @EventPattern('product_updated')
  async handleProductUpdate(product: any) {
    this.productService.update(product.id, {
      title: product.title,
      image: product.image,
      likes: product.likes,
    });
  }

  @EventPattern('product_deleted')
  async handleProductDeleted(product: any) {
    this.productService.remove(product.id);
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(Number(id));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: CreateProductDto,
  ) {
    return this.productService.update(Number(id), updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
