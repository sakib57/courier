import {
  ConflictException,
  ForbiddenException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { BranchOperator } from 'src/entities/branch-operator.entity';
import { IBranchOperator } from './branch-operator.interface';
import { CreateOperatorDTO } from './create-branch-operator.dto';
import * as bcrypt from 'bcrypt';
import { hashPassword } from 'src/common/util';
import { Branch } from 'src/entities/branch.entity';
import { UpdateOperatorDTO } from './branch-operator-update.dto';
import { SearchQueryDto } from 'src/common/search-query.dto';
import { ChangePasswordDto } from 'src/common/change-password.dto';

@Injectable()
export class BranchOpreatorService {
  // Operator create
  async operatorCreate(
    createOperatorDto: CreateOperatorDTO,
  ): Promise<IBranchOperator> {
    const { name, email, password, branch_id } = createOperatorDto;

    const branch = await Branch.findOne(branch_id);
    if (!branch) {
      throw new NotFoundException('Branch not found');
    }

    const operator = new BranchOperator();
    operator.name = name;
    operator.email = email;
    operator.salt = await bcrypt.genSalt();
    operator.password = await hashPassword(password, operator.salt);
    operator.branch = branch;

    try {
      return await operator.save();
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email already exist!');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  // Operator update
  async operatorUpdate(
    id: number,
    createOperatorDto: UpdateOperatorDTO,
  ): Promise<IBranchOperator> {
    const { name, permissions, image, isActive } = createOperatorDto;

    const operator = await BranchOperator.findOne(id);
    if (!operator) {
      throw new NotFoundException('Operator not found');
    }

    operator.name = name;
    operator.permissions = JSON.stringify(permissions);
    operator.image = image;
    operator.isActive = isActive;

    try {
      operator.save();
    } catch (err) {
      throw new HttpException('Something wrong', 500);
    }
    return operator;
  }

  // Operator List
  async operatorList(searchQueryDto: SearchQueryDto) {
    const branch = await Branch.findOne({
      id: searchQueryDto.branch_id,
    });
    let operators = null;
    if (branch) {
      operators = await BranchOperator.find({
        where: { branch: branch },
        relations: ['branch'],
      });
    } else {
      operators = await BranchOperator.find({
        relations: ['branch'],
      });
    }

    return operators;
  }

  // Find Operator
  async operatorFind(id: number) {
    const operator = await BranchOperator.findOne(id);
    if (!operator) {
      throw new NotFoundException('Operator not found');
    }
    return operator;
  }

  // Operator Delete
  async operatorDelete(id: number) {
    const operator = await BranchOperator.findOne(id);
    if (!operator) {
      throw new NotFoundException('Operator not found');
    }
    if (operator.isManager) {
      throw new ForbiddenException("Manager can't be deleted");
    }
    await BranchOperator.delete(operator);

    return operator;
  }

  // Cgange password
  async changePassword(id, changePasswordDto: ChangePasswordDto) {
    const { oldPassword, newPassword } = changePasswordDto;
    const branchOperator = await BranchOperator.findOne(id);
    if (!branchOperator) {
      throw new NotFoundException('Operator not found');
    }
    const isMatched = await branchOperator.validateBranchOperatorPassword(
      oldPassword,
    );
    if (isMatched) {
      branchOperator.salt = await bcrypt.genSalt();
      branchOperator.password = await hashPassword(
        newPassword,
        branchOperator.salt,
      );
      await branchOperator.save();
      return branchOperator;
    } else {
      throw new NotFoundException("Old password didn't match");
    }
  }
}
