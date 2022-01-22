import { Rider } from './../entities/rider.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Admin } from 'src/entities/admin.entity';
import { Branch } from 'src/entities/branch.entity';
import { Customer } from 'src/entities/customer.entity';

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
  port: 3306,
  username: 'root',
  password: undefined,
  database: 'courier',
  entities: [Branch, Admin, Rider, Customer],
  synchronize: true,
};
