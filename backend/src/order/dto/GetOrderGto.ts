import { GetOrderCommodityDto } from './GetOrderCommodityDto';
import { AutoMap } from '@automapper/classes';
import { Schema } from 'mongoose';
import { GetCustomerDto } from 'src/customer/dto';
import { GetSupplierDto } from 'src/supplier/dto';

export class GetOrderDto {
    @AutoMap()
    _id: Schema.Types.ObjectId;

    @AutoMap()
    customer: GetCustomerDto;

    @AutoMap()
    supplier: GetSupplierDto;

    @AutoMap()
    commodities: GetOrderCommodityDto[];

    @AutoMap()
    status: string;

    @AutoMap()
    advance?: number;

    @AutoMap()
    createdAt: Date;
}
