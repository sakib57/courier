import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import IUser from '../interface/user.interface';
import { UserType } from 'src/common/util';
import { Admin } from 'src/entities/admin.entity';
import { Merchant } from 'src/entities/merchant.entity';
import { Rider } from 'src/entities/rider.entity';
import Permission from 'src/permission/permission.type';

const PermissionGuard = (parcelPermission: Permission): Type<CanActivate> => {
  class PermissionGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest<IUser>();
      const user: any = request.user;
      let dbUser = null;
      switch (user?.type) {
        case UserType.ADMIN:
          dbUser = await Admin.findOne({ id: user.id });
          break;
        case UserType.MERCHANT:
          dbUser = await Merchant.findOne({ id: user.id });
          break;
        case UserType.RIDER:
          dbUser = await Rider.findOne({ id: user.id });
          break;
      }
      if (dbUser?.permissions != null) {
        const permissions = JSON.parse(dbUser?.permissions);
        return permissions.includes(parcelPermission);
      }
      return false;
    }
  }

  return mixin(PermissionGuardMixin);
};

export default PermissionGuard;
