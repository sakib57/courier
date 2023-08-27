import { Request } from 'express';
import { User } from 'src/entities/user.entity';

interface IUser extends Request {
  user: User;
}

export default IUser;
