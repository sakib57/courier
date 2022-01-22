import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminDto } from 'src/admin/admin.dto';
import { AdminRepository } from 'src/admin/admin.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminRepository)
    private adminRepository: AdminRepository,
    private jwtService: JwtService,
  ) {}

  // Admin Sign In method
  async adminSignIn(authCredentialsDto: AuthCredentialsDto): Promise<AdminDto> {
    const admin: AdminDto = await this.adminRepository.signIn(
      authCredentialsDto,
    );
    if (!admin) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const accessToken = await this.jwtService.sign(admin);
    admin.accessToken = accessToken;
    return admin;
  }
}
