import {
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductsEntity } from './entities/products.entity';
import { ProductsService } from './products.service';

export type ProductsResponse = {
  message: string;
  data?: ProductsEntity | ProductsEntity[] | null;
};

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get()
  async findAll(): Promise<ProductsResponse> {
    this.client.emit('products_fetched', { message: 'Products fetched!' });

    return {
      message: 'Products fetched successfully!',
      data: await this.productsService.findAll(),
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
    return {
      message: 'Product fetched successfully!',
      data: await this.productsService.findOne(Number(id)),
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Request() request: any,
  ): Promise<ProductsResponse> {
    const { title, image } = request.body;

    return {
      message: 'Product updated successfully!',
      data: await this.productsService.update(Number(id), {
        title,
        image,
      }),
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ProductsResponse> {
    await this.productsService.remove(Number(id));

    return {
      message: 'Product deleted successfully!',
    };
  }
}
