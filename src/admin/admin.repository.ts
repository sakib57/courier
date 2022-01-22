import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';
import { Admin } from 'src/entities/admin.entity';
import { Repository } from 'typeorm';
import { AdminDto } from './admin.dto';

export class AdminRepository extends Repository<Admin> {
  // Sign In Method
  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<AdminDto> {
    const { email, password } = authCredentialsDto;
    const admin = await this.findOne(email);

    if (admin && (await admin.validatePassword(password))) {
      const adminData: AdminDto = {
        name: admin.name,
        email: '',
        accessToken: '',
      };

      return adminData;
    } else {
      return null;
    }
  }
}
