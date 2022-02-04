import { SignInDto } from 'src/auth/dto/sign-in.dto';
import { Admin } from 'src/entities/admin.entity';
import { EntityRepository, Repository } from 'typeorm';
import { AdminDto } from './admin.dto';

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {
  // Sign In Method
  async signIn(signInDto: SignInDto): Promise<AdminDto> {
    const { email, password } = signInDto;
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
