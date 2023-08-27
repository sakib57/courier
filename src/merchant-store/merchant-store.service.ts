import { Injectable, NotFoundException } from '@nestjs/common';
import { Store } from 'src/entities/store.entity';
import { StoreDto } from './dto/merchant-store.dto';
import { Merchant } from 'src/entities/merchant.entity';
import { StoreUpdateDto } from './dto/merchant-store-update.dto';

@Injectable()
export class MerchantStoreService {
  // Store Create
  async createStore(storeDto: StoreDto): Promise<Store> {
    const { merchant_id, name, pickup_address, return_address } = storeDto;

    const merchant = await Merchant.findOne({ id: merchant_id });
    if (!merchant) {
      throw new NotFoundException('Merchant not found');
    }

    const store = new Store();
    store.merchant = merchant;
    store.name = name;
    store.pickup_address = pickup_address;
    store.return_address = return_address;
    store.status = 'Active';
    try {
      await store.save();
    } catch (error) {
      console.log(error);
    }

    return store;
  }

  // Store Update
  async updateStore(
    id: number,
    storeUpdateDto: StoreUpdateDto,
  ): Promise<Store> {
    const { name, pickup_address, return_address, status } = storeUpdateDto;
    const store = Store.findOne({ id: id });
    if (!store) {
      throw new NotFoundException('Store not found');
    }

    (await store).name = name;
    (await store).pickup_address = pickup_address;
    (await store).return_address = return_address;
    (await store).status = status;
    (await store).save();

    return store;
  }

  // Find all store by merchant_id
  async findAll(merchant_id): Promise<any> {
    const stores = await Store.find({
      where: { merchant: merchant_id },
      relations: ['merchant'],
    });
    return stores;
  }

  // Find store by id
  async findOne(id): Promise<any> {
    const store = await Store.findOne({
      where: { id: id },
      relations: ['merchant'],
    });
    if (!store) {
      throw new NotFoundException('Store not found');
    }
    return store;
  }

  // Delete store by id
  async delete(id): Promise<any> {
    await Store.delete(id);
  }
}
