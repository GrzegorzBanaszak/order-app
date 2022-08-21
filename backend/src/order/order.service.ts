import { Order, OrderDocument } from './order.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostOrderDto } from './dto';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    ) {}

    async getAll(): Promise<Order[]> {
        return await this.orderModel.find().populate([
            {
                path: 'customer',
                model: 'Customer',
            },
            {
                path: 'customer',
                populate: {
                    path: 'company',
                    model: 'Company',
                },
            },
            {
                path: 'supplier',
                model: 'Supplier',
            },
            {
                path: 'commoditys',
                populate: {
                    path: 'commodity',
                    model: 'Commodity',
                },
            },
        ]);
    }

    async add(data: PostOrderDto) {
        const order = new this.orderModel(data);
        await order.populate('customer');
        await order.populate('supplier');
        await order.populate({
            path: 'commoditys',
            populate: {
                path: 'commodity',
                model: 'Commodity',
            },
        });

        return await order.save();
    }
}
