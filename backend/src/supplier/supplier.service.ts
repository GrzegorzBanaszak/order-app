import { Supplier, SupplierDocument } from './supplier.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostSupplierDto, SupplierInfoDto } from './dto';
import { Order, OrderDocument } from 'src/order/order.schema';

@Injectable()
export class SupplierService {
    constructor(
        @InjectModel(Supplier.name)
        private supplierModel: Model<SupplierDocument>,
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    ) {}

    async getAll(): Promise<SupplierInfoDto[]> {
        const suppliers = await this.supplierModel
            .find()
            .sort({ createdAt: 1 });

        const suppliersInfo: SupplierInfoDto[] = [];

        for (const supplier of suppliers) {
            const orders = await this.orderModel
                .find({ supplier: supplier._id })
                .sort({ createdAt: 1 });

            if (orders.length > 0) {
                suppliersInfo.push(
                    new SupplierInfoDto(
                        supplier._id,
                        supplier.name,
                        supplier.price,
                        orders.length,
                        orders[0].createdAt,
                    ),
                );
            } else {
                suppliersInfo.push(
                    new SupplierInfoDto(
                        supplier._id,
                        supplier.name,
                        supplier.price,
                        0,
                    ),
                );
            }
        }

        return suppliersInfo;
    }

    async add(data: PostSupplierDto): Promise<Supplier> {
        const supplier = new this.supplierModel(data);
        return await supplier.save();
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
