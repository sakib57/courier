import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AdminDto } from 'src/admin/admin.dto';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // ======== Admin Sign In Method =========
  @Post('/admin/signin')
  adminSignIn(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialsDto,
  ): Promise<AdminDto> {
    return this.authService.adminSignIn(authCredentialDto);
  }
}
