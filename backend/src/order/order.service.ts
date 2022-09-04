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
                path: 'commodities',
                populate: {
                    path: 'commodity',
                    model: 'Commodity',
                },
            },
        ]);
    }

    //Return limited list of orders
    async getAtRange(range: number): Promise<Order[]> {
        return await this.orderModel.find().sort('-createdAt').limit(range);
    }

    async add(data: PostOrderDto) {
        const order = new this.orderModel(data);
        await order.populate({
            path: 'commodities',
            populate: {
                path: 'commodity',
                model: 'Commodity',
            },
        });

        return await order.save();
    }
}
