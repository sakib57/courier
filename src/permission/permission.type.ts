import {
  DashboardPermission,
  ListMerchantPermission,
  ListRiderPermission,
  ManageOperatorPermission,
  OrderTrackingPermission,
  ParcelPermission,
  PaymentPermission,
  StorePermission,
} from './enums';

const Permission = {
  ...ParcelPermission,
  ...DashboardPermission,
  ...StorePermission,
  ...PaymentPermission,
  ...ListMerchantPermission,
  ...ListRiderPermission,
  ...OrderTrackingPermission,
  ...ManageOperatorPermission,
};

type Permission =
  | ParcelPermission
  | DashboardPermission
  | StorePermission
  | PaymentPermission
  | ListMerchantPermission
  | ListRiderPermission
  | OrderTrackingPermission
  | ManageOperatorPermission;

export default Permission;
