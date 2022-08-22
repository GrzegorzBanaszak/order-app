import {
    ArrayMinSize,
    IsArray,
    IsMongoId,
    IsNotEmpty,
    IsNumber,
} from 'class-validator';
import { Schema } from 'mongoose';
import { PostOrderCommodityDto } from './PostOrderCommodityDto';

export class PostOrderDto {
    @IsNotEmpty()
    @IsMongoId()
    customer: Schema.Types.ObjectId;

    @IsNotEmpty()
    @IsMongoId()
    supplier: Schema.Types.ObjectId;

    @IsArray()
    @ArrayMinSize(1)
    commoditys: PostOrderCommodityDto[];

    @IsNumber()
    advance?: number;
}
