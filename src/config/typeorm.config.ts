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
import { DeliveryParcel } from 'src/entities/delivery-parcel.entity';
import { join } from 'path';
import { Store } from 'src/entities/store.entity';
import { Road } from 'src/entities/road.entity';
import { PaymentRequest } from 'src/entities/payment-request.entity';
import { PaymentParcel } from 'src/entities/payment-parcel.entity';
import { BranchOperator } from 'src/entities/branch-operator.entity';
import { Ride } from 'src/entities/ride.entity';
import { PickupRequest } from 'src/entities/pickup-request.entity';
import { ReturnParcel } from 'src/entities/return-parcel.entity';

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
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  // port: parseInt(process.env.DB_PORT),
  entities: [
    Branch,
    Admin,
    Rider,
    Ride,
    Customer,
    District,
    Upazila,
    Road,
    Merchant,
    Store,
    Parcel,
    PickupParcel,
    DeliveryParcel,
    ReturnParcel,
    PaymentRequest,
    PaymentParcel,
    BranchOperator,
    PickupRequest,
  ],
  synchronize: true,
};
