import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { ProductsModule } from './products/products.module';
dotenv.config();

const DB_HOST = process.env.MONGODB_LOCAL || 'mongodb://127.0.0.1';
const DB_NAME = process.env.DB_NAME || 'nest_main';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRoot(DB_HOST, {
      useUnifiedTopology: true,
      autoCreate: true,
      dbName: DB_NAME,
    }),
    ProductsModule,
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
