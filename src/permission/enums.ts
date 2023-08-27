export enum ParcelPermission {
  PickupRequest = 'PickupRequest',
  CreateParcel = 'CreateParcel',
  UpdateParcel = 'UpdateParcel',
  ListParcel = 'ListParcel',
  ExportParcelList = 'ExportParcelList',
  LsitPickupRequest = 'LsitPickupRequest',
  PrintParcelInformation = 'PrintParcelInformation',
  ListParcelDelivered = 'ListParcelDelivered',
  ListReturnParcel = 'ListReturnParcel',
  AcceptPickupRequest = 'AcceptPickupRequest',
}

export enum DashboardPermission {
  ShowDashboard = 'ShowDashboard',
}

export enum StorePermission {
  StoreList = 'StoreList',
  CreateStore = 'CreateStore',
  UpdateStore = 'UpdateStore',
  RemoveStore = 'RemoveStore',
}

export enum PaymentPermission {
  WalletInformation = 'WalletInformation',
  PaymentRerquest = 'PaymentRerquest',
  InvoiceList = 'InvoiceList',
  DownloadInvoiceList = 'DownloadInvoiceList',
  ListPaymentRerquest = 'ListPaymentRerquest',
  PaymentOperation = 'PaymentOperation',
}

export enum ListMerchantPermission {
  ShowListMerchant = 'ShowListMerchant',
}

export enum ListRiderPermission {
  ShowListRider = 'ShowListRider',
  AssignRider = 'AssignRider',
}

export enum OrderTrackingPermission {
  OrderTracking = 'OrderTracking',
}

export enum ManageOperatorPermission {
  CreateOperator = 'CreateOperator',
  EditOperator = 'EditOperator',
  DeleteOperator = 'DeleteOperator',
}
