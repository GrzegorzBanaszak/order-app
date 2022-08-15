import { Supplier, SupplierDocument } from './supplier.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SupplierService {
  constructor(
    @InjectModel(Supplier.name) private supplierModel: Model<SupplierDocument>,
  ) {}

  async add(): Promise<Supplier> {
    const supplier = new this.supplierModel({ name: 'Test' });
    return supplier.save();
  }
}
