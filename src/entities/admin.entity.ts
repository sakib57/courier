import { Entity } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Entity()
export class Admin extends User {
  // aurhentication password validation
  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
