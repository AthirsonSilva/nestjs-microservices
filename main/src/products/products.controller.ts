import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly httpService: HttpService,
  ) {}

  @EventPattern('products_fetched')
  async handleProductsFetched(data: any) {
    return {
      products: data,
    };
  }

  @EventPattern('product_created')
  async handleProductCreated(product: any) {
    this.productsService.create({
      id: product.id,
      title: product.title,
      image: product.image,
      likes: product.likes,
    });
  }

  @EventPattern('product_updated')
  async handleProductUpdate(product: any) {
    this.productsService.update(product.id, {
      title: product.title,
      image: product.image,
      likes: product.likes,
    });
  }

  @EventPattern('product_deleted')
  async handleProductDeleted(product: any) {
    this.productsService.remove(product.id);
  }

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Post('like')
  async like(@Query('id') id: string) {
    this.httpService
      .post(`http://localhost:3333/api/products/like?id=${id}`, {})
      .subscribe((response) => {
        return response.data;
      });
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(Number(id));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: CreateProductDto,
  ) {
    return this.productsService.update(Number(id), updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
