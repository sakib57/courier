import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class XlsxParcelDTO implements Readonly<XlsxParcelDTO> {
  @ApiProperty()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  d_branch_id: number;

  @ApiProperty({ type: 'string', format: 'binary' })
  file: string;
}
