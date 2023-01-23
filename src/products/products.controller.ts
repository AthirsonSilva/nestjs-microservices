import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { ProductsService } from './products.service';

export type ProductsResponse = {
  message: string;
  data?: any;
};

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(): Promise<ProductsResponse> {
    return {
      message: 'Products fetched successfully!',
      data: await this.productsService.findAll(),
    };
  }

  @Post()
  async create(@Request() request: any): Promise<ProductsResponse> {
    const { title, image } = request.body;

    return {
      message: 'Product created successfully!',
      data: await this.productsService.create({
        title,
        image,
      }),
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
    return {
      message: 'Product deleted successfully!',
    };
  }
}
