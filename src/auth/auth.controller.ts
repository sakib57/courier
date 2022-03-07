import {
  Body,
  Controller,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminDto } from 'src/admin/admin.dto';
import { AuthService } from './auth.service';
import { AdminSignUpDto } from './dto';
import { MerchantSignUpDto } from './dto/merchant-sign-up.dto';
import { RiderSignUpDto } from './dto/rider-sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@ApiTags('Authentication')
@ApiResponse({
  status: HttpStatus.METHOD_NOT_ALLOWED,
  description: 'Method not allowed',
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Server Error!',
})
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // ======== Admin Sign In Method =========
  @Post('admin/signup')
  adminSignUp(@Body(ValidationPipe) signUpDto: AdminSignUpDto): Promise<void> {
    return this.authService.adminSignUp(signUpDto);
  }

  @Post('admin/signin')
  adminSignIn(@Body(ValidationPipe) signInDto: SignInDto): Promise<AdminDto> {
    return this.authService.adminSignIn(signInDto);
  }

  @Post('merchant/signup')
  merchantSignUp(
    @Body(ValidationPipe) signUpDto: MerchantSignUpDto,
  ): Promise<void> {
    return this.authService.merchantSignUp(signUpDto);
  }

  @Post('merchant/signin')
  merchantSignIn(@Body() signInDto: SignInDto): Promise<string> {
    return this.authService.merchantSignIn(signInDto);
  }

  @Post('rider/signup')
  riderSignUp(@Body(ValidationPipe) signUpDto: RiderSignUpDto): Promise<void> {
    return this.authService.riderSignUp(signUpDto);
  }

  @Post('rider/signin')
  riderSignIn(@Body() signInDto: SignInDto): Promise<string> {
    return this.authService.riderSignIn(signInDto);
  }

  @Post('branch/signin')
  branchSignIn(@Body() signInDto: SignInDto): Promise<string> {
    return this.authService.branchSignIn(signInDto);
  }
}
