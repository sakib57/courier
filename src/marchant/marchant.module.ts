import { Module } from '@nestjs/common';
import { MarchantController } from './marchant.controller';
import { MarchantService } from './marchant.service';

@Module({
  controllers: [MarchantController],
  providers: [MarchantService],
})
export class MarchantModule {}
