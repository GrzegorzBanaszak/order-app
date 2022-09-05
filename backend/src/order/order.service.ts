import { Order, OrderDocument } from './order.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostOrderDto } from './dto';
import { orderBy } from 'lodash';

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

    //List of best customers list
    async getBestCustomers() {
        const orders = await this.orderModel.find();

        const map = new Map<any, any>();

        orders.forEach((order) => {
            if (!map.get(order.customer._id)) {
                map.set(order.customer._id, {
                    name: order.customer.name,
                    quantity: 1,
                });
            } else {
                map.set(order.customer._id, {
                    ...map.get(order.customer._id),
                    quantity: map.get(order.customer._id).quantity + 1,
                });
            }
        });

        const bestCustomers = Array.from(map, ([key, value]) => ({
            ...value,
            _id: key,
        }));

        return orderBy(bestCustomers, 'quantity', 'desc');
    }

    //List of best commodities
    async getBestCommodities() {
        const orders = await this.orderModel.find().populate({
            path: 'commodities',
            populate: {
                path: 'commodity',
                model: 'Commodity',
            },
        });

        const map = new Map<any, any>();

        orders.forEach((order) => {
            order.commodities.forEach((commodity) => {
                if (!map.get(commodity.commodity._id)) {
                    map.set(commodity.commodity._id, {
                        name: commodity.commodity.name,
                        quantity: commodity.quantity,
                    });
                } else {
                    map.set(commodity.commodity._id, {
                        ...map.get(commodity.commodity._id),
                        quantity:
                            map.get(commodity.commodity._id).quantity +
                            commodity.quantity,
                    });
                }
            });
        });

        const bestCommodities = Array.from(map, ([key, value]) => ({
            ...value,
            _id: key,
        }));
        return orderBy(bestCommodities, 'quantity', 'desc');
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
