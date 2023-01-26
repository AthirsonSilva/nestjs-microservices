import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductsEntity } from './entities/products.entity';
import { ProductsService } from './products.service';

export type ProductsResponse = {
  message: string;
  data?: ProductsEntity | ProductsEntity[];
};

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get()
  async findAll(): Promise<ProductsResponse> {
    const products = await this.productsService.findAll();

    this.client.emit('products_fetched', products);

    return {
      message: 'Products fetched successfully!',
      data: products,
    };
  }

  @Post()
  async create(@Body() request: CreateProductDto): Promise<ProductsResponse> {
    const product = await this.productsService.create({
      title: request.title,
      image: request.image,
    });

    this.client.emit('product_created', product);

    return {
      message: 'Product created successfully!',
      data: product,
    };
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<ProductsResponse> {
    const product = await this.productsService.findOne(Number(id));

    this.client.emit('product_fetched', product);

    return {
      message: 'Product fetched successfully!',
      data: product,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() request: UpdateProductDto,
  ): Promise<ProductsResponse> {
    const { title, image } = request;
    await this.productsService.update(Number(id), {
      title,
      image,
    });

    const product = await this.productsService.findOne(Number(id));

    this.client.emit('product_updated', product);

    return {
      message: 'Product updated successfully!',
      data: product,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ProductsResponse> {
    await this.productsService.remove(Number(id));

    this.client.emit('product_deleted', id);

    return {
      message: 'Product deleted successfully!',
    };
  }

  @Post('like')
  async like(@Query('id') id: string) {
    console.log('id', id);
    return this.productsService.like(Number(id));
  }
}
