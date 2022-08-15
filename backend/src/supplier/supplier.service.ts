import { Supplier, SupplierDocument } from './supplier.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostSupplierDto } from './dto';

@Injectable()
export class SupplierService {
  constructor(
    @InjectModel(Supplier.name) private supplierModel: Model<SupplierDocument>,
  ) {}

  async getAll(): Promise<Supplier[]> {
    return await this.supplierModel.find();
  }

  async add(data: PostSupplierDto): Promise<Supplier> {
    const supplier = new this.supplierModel(data);
    return supplier.save();
  }

  async update(id: string, data: PostSupplierDto): Promise<Supplier> {
    const updatedSupplier = await this.supplierModel.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
      },
    );

    if (!updatedSupplier) {
      throw new NotFoundException();
    }

    return updatedSupplier;
  }

  async delete(id: string): Promise<string> {
    await this.supplierModel.findByIdAndDelete({ _id: id });

    return id;
  }
}
