import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminRepository } from 'src/admin/admin.repository';
import { MerchantRepository } from 'src/merchant/merchant.repository';
import { RiderRepository } from 'src/rider/rider.repository';
import { BranchRepository } from 'src/branch/branch.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topsecret51',
      signOptions: {
        expiresIn: 3600 * 24,
      },
    }),
    TypeOrmModule.forFeature([
      AdminRepository,
      MerchantRepository,
      RiderRepository,
      BranchRepository,
    ]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
