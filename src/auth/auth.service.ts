import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminDto } from 'src/admin/admin.dto';
import { UserType, hashPassword } from 'src/common/util';
import { Admin } from 'src/entities/admin.entity';
import * as bcrypt from 'bcrypt';
import {
  AdminSignUpDto,
  SignInDto,
  MerchantSignUpDto,
  RiderSignUpDto,
} from './dto';
import { Merchant } from 'src/entities/merchant.entity';
import { Branch } from 'src/entities/branch.entity';
import { Rider } from 'src/entities/rider.entity';
import { BranchOperator } from 'src/entities/branch-operator.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // Admin SignUp
  async adminSignUp(signUpDto: AdminSignUpDto) {
    const { name, email, password } = signUpDto;

    const admin = new Admin();
    admin.name = name;
    admin.email = email;
    admin.salt = await bcrypt.genSalt();
    admin.password = await hashPassword(password, admin.salt);

    try {
      return await admin.save();
    } catch (error) {
      console.log(error);
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email already exist!');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  // Admin Sign In method
  async adminSignIn(signInDto: SignInDto): Promise<AdminDto> {
    const { email, password } = signInDto;
    const admin = await Admin.findOne({ email });
    let adminData = null;
    if (admin && (await admin.validatePassword(password))) {
      adminData = {
        id: admin.id,
        name: admin.name,
        type: UserType.ADMIN,
        permissions: admin.permissions,
      };
    }
    if (!adminData) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const accessToken = await this.jwtService.sign(adminData);
    adminData.accessToken = accessToken;
    return adminData;
  }

  // Merchant SignUp
  async merchantSignUp(signUpDto: MerchantSignUpDto) {
    const {
      name,
      email,
      password,
      company_name,
      address,
      contact_number,
      branch_id,
      parent_merchant_id,
    } = signUpDto;

    const branch = await Branch.findOne(branch_id);
    if (!branch) {
      throw new NotFoundException('Branch not found');
    }

    const merchant = new Merchant();
    merchant.name = name;
    merchant.email = email;
    merchant.salt = await bcrypt.genSalt();
    merchant.password = await hashPassword(password, merchant.salt);
    merchant.company_name = company_name;
    merchant.address = address;
    merchant.contact_number = contact_number;
    merchant.branch = branch;
    merchant.parent_merchant_id = parent_merchant_id;

    try {
      return await merchant.save();
    } catch (error) {
      console.log(error);
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email already exist!');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  // Merchant SignIn
  async merchantSignIn(signInDto: SignInDto): Promise<string> {
    const { email, password } = signInDto;
    const merchant = await Merchant.findOne({ email });
    let merchantData = null;
    if (merchant && (await merchant.validateMerchantPassword(password))) {
      merchantData = {
        id: merchant.id,
        name: merchant.name,
        email: merchant.email,
        type: UserType.MERCHANT,
        permissions: merchant.permissions,
      };
    }
    if (!merchantData) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const accessToken = this.jwtService.sign(merchantData);
    return accessToken;
  }

  // Rider SignUp
  async riderSignUp(signUpDto: RiderSignUpDto) {
    const { name, email, password, address, contact_number, branch_id } =
      signUpDto;

    const branch = await Branch.findOne(branch_id);
    if (!branch) {
      throw new NotFoundException('Branch not found');
    }

    const rider = new Rider();
    rider.name = name;
    rider.email = email;
    rider.salt = await bcrypt.genSalt();
    rider.password = await hashPassword(password, rider.salt);
    rider.address = address;
    rider.contact_number = contact_number;
    rider.branch = branch;
    rider.isActive = true;
    try {
      return await rider.save();
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email already exist!');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  // Rider SignIn
  async riderSignIn(signInDto: SignInDto): Promise<string> {
    const { email, password } = signInDto;
    const rider = await Rider.findOne({ email });
    let riderData = null;
    if (rider && (await rider.validateRiderPassword(password))) {
      riderData = {
        id: rider.id,
        name: rider.name,
        email: rider.email,
        type: UserType.RIDER,
        permissions: rider.permissions,
      };
    }
    if (!riderData) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const accessToken = this.jwtService.sign(riderData);
    return accessToken;
  }

  // Branch SignIn
  async branchSignIn(signInDto: SignInDto): Promise<any> {
    const { email, password } = signInDto;
    const branchOperator = await BranchOperator.findOne(
      {
        email: email,
      },
      { relations: ['branch'] },
    );
    let branchOperatorData = null;
    if (
      branchOperator &&
      (await branchOperator.validateBranchOperatorPassword(password))
    ) {
      branchOperatorData = {
        id: branchOperator.id,
        name: branchOperator.name,
        email: branchOperator.email,
        type: branchOperator.isManager ? 'manager' : 'operator',
        permissions: branchOperator.permissions,
      };
    }
    if (!branchOperatorData) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const accessToken = this.jwtService.sign(branchOperatorData);
    return {
      branch_id: branchOperator.branch,
      token: accessToken,
    };
  }
}
