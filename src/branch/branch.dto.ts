import { IsNotEmpty } from 'class-validator';

export class BranchDto {
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  user_email: string;

  @IsNotEmpty()
  user_password: string;

  salt: string;
}
