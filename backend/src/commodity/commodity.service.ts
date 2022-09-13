import { Commodity, CommodityDocument } from './commodity.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommodityInfoDto, PostCommodityDto } from './dto';
import { Order, OrderDocument } from 'src/order/order.schema';
import { ObjectId } from 'mongodb';

@Injectable()
export class CommodityService {
    constructor(
        @InjectModel(Commodity.name)
        private commodityModel: Model<CommodityDocument>,
        @InjectModel(Order.name)
        private orderModel: Model<OrderDocument>,
    ) {}

    async getAll(): Promise<CommodityInfoDto[]> {
        const commodities = await this.commodityModel.find();

        const commoditisInfo = new Array<CommodityInfoDto>(0);

        for (const commodity of commodities) {
            const order = await this.orderModel
                .findOne({
                    'commodities.commodity': commodity._id,
                })
                .sort('-createdAt')
                .populate({
                    path: 'commodities',
                    populate: {
                        path: 'commodity',
                        model: 'Commodity',
                    },
                });

            if (order) {
                const commodityLastPrice = order.commodities.find(
                    (x) => x.commodity.name === commodity.name,
                )?.price;

                if (commodityLastPrice) {
                    commoditisInfo.push(
                        new CommodityInfoDto(
                            commodity._id,
                            commodity.name,
                            commodityLastPrice,
                            order.createdAt,
                        ),
                    );
                }
            } else {
                commoditisInfo.push(
                    new CommodityInfoDto(commodity._id, commodity.name, 0),
                );
            }
        }

        return commoditisInfo;
    }

    async getById(id: string): Promise<Commodity> {
        try {
            const commodity = await this.commodityModel.findById(id);

            if (!commodity) {
                throw new NotFoundException();
            }

            return commodity;
        } catch (error) {
            throw new Error(error);
        }
    }

    async add(data: PostCommodityDto): Promise<Commodity> {
        const commodity = new this.commodityModel(data);
        return await commodity.save();
    }

    async update(id: string, data: PostCommodityDto): Promise<Commodity> {
        const updatedCommodity = await this.commodityModel.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
            },
        );

        if (!updatedCommodity) {
            throw new NotFoundException();
        }

        return updatedCommodity;
    }

    async delete(id: string): Promise<string> {
        await this.commodityModel.findByIdAndDelete(id);
        return id;
    }
}
