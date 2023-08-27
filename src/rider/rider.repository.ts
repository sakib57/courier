import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { RiderSignUpDto } from 'src/auth/dto/rider-sign-up.dto';
import { Branch } from 'src/entities/branch.entity';
import { Rider } from 'src/entities/rider.entity';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { hashPassword } from 'src/common/util';
import { SignInDto } from 'src/auth/dto/sign-in.dto';
import { RiderDto } from './rider.dto';

@EntityRepository(Rider)
export class RiderRepository extends Repository<Rider> {
  // Validate password
}
