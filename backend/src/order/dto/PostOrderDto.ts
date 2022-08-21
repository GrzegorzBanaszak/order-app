import { Schema } from 'mongoose';
import { PostOrderCommodityDto } from './PostOrderCommodityDto';

export class PostOrderDto {
    customer: Schema.Types.ObjectId;
    supplier: Schema.Types.ObjectId;
    commoditys: PostOrderCommodityDto[];
    status: string;
    advance?: number;
}
