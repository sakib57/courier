import {
  ForbiddenException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MerchantUpdateDto } from './merchant-update.dto';
import { IMerchant } from './merchant.interface';
import * as bcrypt from 'bcrypt';
import { hashPassword } from 'src/common/util';
import { ChangePasswordDto } from 'src/common/change-password.dto';
import { SearchQueryDto } from 'src/common/search-query.dto';
import { Merchant } from 'src/entities/merchant.entity';
import { Branch } from 'src/entities/branch.entity';
import { PaymentRequestDto } from './payment-request.dto';
import { DeliveryStatus, Parcel } from 'src/entities/parcel.entity';
import {
  PaymentRequest,
  PaymentStatus,
} from 'src/entities/payment-request.entity';
import { PaymentParcel } from 'src/entities/payment-parcel.entity';
import { UpdatePaymentRequestDto } from './update-payment-request.dto';
import { getRepository } from 'typeorm';

@Injectable()
export class MerchantService {
  // Merchants profile
  async merchantProfile(id: number): Promise<IMerchant> {
    const merchant = await Merchant.findOne({
      where: { id: id },
      relations: ['branch'],
    });
    if (!merchant) {
      throw new NotFoundException('Merchant not found');
    }
    return merchant;
  }

  // Create Payment Request
  async merchantPaymentRequest(
    paymentRequestDto: PaymentRequestDto,
  ): Promise<any> {
    const merchant = await Merchant.findOne(paymentRequestDto.merchant);
    const branch = await Branch.findOne(paymentRequestDto.branch);
    const parcels = await Parcel.find({
      where: [
        { merchant: paymentRequestDto.merchant },
        { delivery_status: DeliveryStatus.DELIVERED },
        { isPaid: false },
      ],
    });
    console.log(parcels);
    let collect_sum = 0;
    let product_sum = 0;
    let delivery_sum = 0;
    parcels.forEach((parcel) => {
      if (parcel.collect_amount) {
        collect_sum += parseFloat(parcel.collect_amount.toString());
      }
      if (parcel.product_cost_amount) {
        product_sum += parseFloat(parcel.product_cost_amount.toString());
      }
      if (parcel.delivery_fees) {
        delivery_sum += parseFloat(parcel.delivery_fees.toString());
      }
      // collect_sum += parseFloat(parcel.collect_amount.toString());
      // product_sum += parseFloat(parcel.product_cost_amount.toString());
      // delivery_sum += parseFloat(parcel.delivery_fees.toString());
    });

    if (merchant && branch && parcels && collect_sum > 0) {
      const paymentRequest = new PaymentRequest();
      paymentRequest.branch = branch;
      paymentRequest.merchant = merchant;
      paymentRequest.collect_amount_sum = collect_sum;
      paymentRequest.product_amount_sum = product_sum;
      paymentRequest.delivery_charge_sum = delivery_sum;
      paymentRequest.bank_name = paymentRequestDto.bank_name;
      paymentRequest.bank_branch = paymentRequestDto.bank_branch;
      paymentRequest.bank_acc_name = paymentRequestDto.bank_acc_name;
      paymentRequest.bank_acc_no = paymentRequestDto.bank_acc_no;
      paymentRequest.bank_routing_no = paymentRequestDto.bank_routing_no;
      paymentRequest.bkash_no = paymentRequestDto.bkash_no;
      try {
        const newPaymentReq = await paymentRequest.save();
        const newPayment = await PaymentRequest.findOne({
          id: newPaymentReq.id,
        });
        const paymentParcel = new PaymentParcel();
        parcels.forEach(async (parcel) => {
          paymentParcel.paymentReq = newPayment;
          paymentParcel.parcel = parcel;
          await paymentParcel.save();
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      throw new ForbiddenException(
        "You don't have sufficient ammout in wallet",
      );
    }
    return true;
  }

  // Create Payment Request
  async merchantPaymentRequestUpdate(
    id: number,
    updatePaymentRequestDto: UpdatePaymentRequestDto,
  ): Promise<any> {
    const paymentRequest = await PaymentRequest.findOne({
      where: { id: id },
      relations: ['merchant'],
    });
    paymentRequest.payment_status = updatePaymentRequestDto.payment_status;
    if (updatePaymentRequestDto.payment_status == PaymentStatus.COMPLETED) {
      const merchant = await Merchant.findOne(paymentRequest.merchant.id);

      merchant.wallet = 0;
      await merchant.save();
    }
    try {
      await paymentRequest.save();
    } catch (e) {
      console.log(e);
    }
    return true;
  }

  // Merchants profile update
  async merchantProfileUpdate(
    id: number,
    merchantUpdateDto: MerchantUpdateDto,
  ): Promise<IMerchant> {
    const merchant = await Merchant.findOne(id);
    if (!merchant) {
      throw new NotFoundException('Merchant not found');
    }
    merchant.name = merchantUpdateDto.name;
    merchant.company_name = merchantUpdateDto.company_name;
    merchant.address = merchantUpdateDto.address;
    merchant.contact_number = merchantUpdateDto.contact_number;
    merchant.website = merchantUpdateDto.website;
    merchant.facebook = merchantUpdateDto.facebook;
    merchant.nid_number = merchantUpdateDto.nid_number;
    merchant.passport_number = merchantUpdateDto.passport_number;
    merchant.logo = merchantUpdateDto.logo;
    merchant.nid_f_image = merchantUpdateDto.nid_f_image;
    merchant.nid_b_image = merchantUpdateDto.nid_b_image;
    merchant.passport_image = merchantUpdateDto.passport_image;
    merchant.in_city_rate = merchantUpdateDto.in_city_rate;
    merchant.out_city_rate = merchantUpdateDto.out_city_rate;
    merchant.bank_name = merchantUpdateDto.bank_name;
    merchant.bank_branch = merchantUpdateDto.bank_branch;
    merchant.bank_acc_name = merchantUpdateDto.bank_acc_name;
    merchant.bank_acc_no = merchantUpdateDto.bank_acc_no;
    merchant.bank_routing_no = merchantUpdateDto.bank_routing_no;
    merchant.bkash_no = merchantUpdateDto.bkash_no;
    merchant.permissions = JSON.stringify(merchantUpdateDto.permissions);
    merchant.isActive = merchantUpdateDto.isActive;

    try {
      merchant.save();
    } catch (err) {
      throw new HttpException('Something wrong', 500);
    }
    return merchant;
  }

  // Merchant List
  async merchantList(searchQueryDto: SearchQueryDto): Promise<IMerchant[]> {
    const branch = await Branch.findOne({
      id: searchQueryDto.branch_id,
    });
    let merchants = null;
    if (branch) {
      merchants = await Merchant.find({
        where: {
          branch: branch,
        },
        relations: ['branch'],
      });
    } else {
      merchants = await Merchant.find({
        relations: ['branch'],
      });
    }

    const newMerchants = [];
    merchants.map((value) => {
      const response: IMerchant = {
        id: value.id,
        name: value.name,
        email: value.email,
        company_name: value.company_name,
        address: value.address,
        contact_number: value.contact_number,
        parent_merchant_id: value.parent_merchant_id,
        permissions: value.permissions,
        branch: value.branch,
        isActive: value.isActive,
      };
      newMerchants.push(response);
    });
    return newMerchants;
  }

  // Merchant List
  async merchantDelete(id: number): Promise<any> {
    const merchant = await Merchant.findOne({
      id: id,
    });
    if (!merchant) {
      throw new NotFoundException('Operator not found');
    }
    const isOperator = merchant.parent_merchant_id;
    if (isOperator != null) {
      Merchant.delete(merchant);
      return 'Operator deleted';
    }
    throw new ForbiddenException("Owner can't be deleted");
  }

  // Cgange password
  async changePassword(id, changePasswordDto: ChangePasswordDto) {
    const { oldPassword, newPassword } = changePasswordDto;
    const merchant = await Merchant.findOne(id);
    if (!merchant) {
      throw new NotFoundException('Merchant not found');
    }
    const isMatched = await merchant.validateMerchantPassword(oldPassword);
    if (isMatched) {
      merchant.salt = await bcrypt.genSalt();
      merchant.password = await hashPassword(newPassword, merchant.salt);
      await merchant.save();
      return merchant;
    } else {
      throw new NotFoundException("Old password didn't match");
    }
  }

  // Count API
  async count(): Promise<any> {
    const repository = getRepository(Merchant);

    try {
      const count = await repository.count();
      return {
        status: 'Success',
        count: count,
      };
    } catch (error) {
      // Handle the error
      console.error('Error while fetching count:', error);
      throw error;
    }
  }
}
