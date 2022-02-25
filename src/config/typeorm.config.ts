import * as path from 'path';
import * as dotenv from 'dotenv';
import { Rider } from './../entities/rider.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Admin } from 'src/entities/admin.entity';
import { Branch } from 'src/entities/branch.entity';
import { Customer } from 'src/entities/customer.entity';
import { District } from 'src/entities/district.entity';
import { Upazila } from 'src/entities/upazila.entity';
import { Merchant } from 'src/entities/merchant.entity';
import { Parcel } from 'src/entities/parcel.entity';
import { PickupParcel } from 'src/entities/pickup-parcel.entity';

// const env = process.env.NODE_ENV || "dev";
const dotenv_path = path.resolve(process.cwd(), `.env`);
const result = dotenv.config({ path: dotenv_path });
if (result.error) {
  console.log('ERROR: could not find dotenv_path', dotenv_path);
}

// ======= Congigiration fot postgres DB =========
// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: 'sakib984',
//   database: 'courier',
//   entities: [],
//   synchronize: true,
// };

// ======= Congigiration fot mysql DB =========

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
  entities: [
    Branch,
    Admin,
    Rider,
    Customer,
    District,
    Upazila,
    Merchant,
    Rider,
    Parcel,
    PickupParcel,
  ],
  synchronize: true,
};
