import * as dotenv from 'dotenv';
dotenv.config();

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.MONGODB_LOCAL,
    port: parseInt(process.env.DATABASE_PORT, 10) || 27017,
  },
});
