import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminDto } from 'src/admin/admin.dto';
import { AdminRepository } from 'src/admin/admin.repository';
import { BranchDto } from 'src/branch/branch.dto';
import { BranchRepository } from 'src/branch/branch.repository';
import { MerchantDto } from 'src/merchant/merchant.dto';
import { MerchantRepository } from 'src/merchant/merchant.repository';
import { RiderDto } from 'src/rider/rider.dto';
import { RiderRepository } from 'src/rider/rider.repository';
import {
  AdminSignUpDto,
  SignInDto,
  MerchantSignUpDto,
  RiderSignUpDto,
} from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminRepository)
    private adminRepository: AdminRepository,
    @InjectRepository(MerchantRepository)
    private merchantRepository: MerchantRepository,
    @InjectRepository(RiderRepository)
    private riderRepository: RiderRepository,
    @InjectRepository(BranchRepository)
    private branchRepository: BranchRepository,
    private jwtService: JwtService,
  ) {}

  // Admin SignUp
  async adminSignUp(signUpDto: AdminSignUpDto) {
    return this.adminRepository.signUp(signUpDto);
  }

  // Admin Sign In method
  async adminSignIn(signInDto: SignInDto): Promise<AdminDto> {
    const admin: AdminDto = await this.adminRepository.signIn(signInDto);
    if (!admin) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const accessToken = await this.jwtService.sign(admin);
    admin.accessToken = accessToken;
    return admin;
  }

  // Merchant SignUp
  async merchantSignUp(signUpDto: MerchantSignUpDto) {
    return this.merchantRepository.signUp(signUpDto);
  }

  // Merchant SignIn
  async merchantSignIn(signInDto: SignInDto): Promise<string> {
    const merchant: MerchantDto =
      await this.merchantRepository.validateMerchantPassword(signInDto);
    if (!merchant) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const accessToken = this.jwtService.sign(merchant);
    return accessToken;
  }

  // Rider SignUp
  async riderSignUp(signUpDto: RiderSignUpDto) {
    return this.riderRepository.signUp(signUpDto);
  }

  // Rider SignIn
  async riderSignIn(signInDto: SignInDto): Promise<string> {
    const rider: RiderDto = await this.riderRepository.validateRiderPassword(
      signInDto,
    );
    if (!rider) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const accessToken = this.jwtService.sign(rider);
    return accessToken;
  }

  // Branch SignIn
  async branchSignIn(signInDto: SignInDto): Promise<string> {
    const branch: BranchDto =
      await this.branchRepository.validateBranchPassword(signInDto);
    if (!branch) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const accessToken = this.jwtService.sign(branch);
    return accessToken;
  }
}
