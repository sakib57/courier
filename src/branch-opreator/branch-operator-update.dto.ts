import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import Permission from 'src/permission/permission.type';

export class UpdateOperatorDTO {
  @ApiProperty()
  name: string;

  @ApiProperty({
    enum: Permission,
    isArray: true,
  })
  @IsOptional()
  @IsEnum(Permission, { each: true })
  permissions: Permission[];

  @ApiProperty()
  image: string;

  @ApiProperty()
  isActive: boolean;
}
