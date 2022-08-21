import { Schema } from 'mongoose';

export class PostOrderCommodityDto {
    commodity: Schema.Types.ObjectId;
    price: number;
    quantity: number;
}
