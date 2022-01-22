import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { BranchModule } from './branch/branch.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, AdminModule, BranchModule],
})
export class AppModule {}
