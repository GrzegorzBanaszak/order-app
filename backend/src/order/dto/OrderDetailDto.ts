import { AutoMap } from '@automapper/classes';
import { Schema } from 'mongoose';
import { OrderDetailCommodity } from 'src/commodity/dto';
import { OrderDetailCustomer } from 'src/customer/dto';
import { OrderDetailSupplier } from 'src/supplier/dto';

export class OrderDetailDto {
    id: Schema.Types.ObjectId;

    @AutoMap()
    advance: number;

    @AutoMap()
    createdAt: Date;

    @AutoMap()
    orderNumber: string;

    @AutoMap()
    status: string;

    @AutoMap()
    supplier: OrderDetailSupplier;

    commodities: Array<OrderDetailCommodity>;

    @AutoMap()
    customer: OrderDetailCustomer;
}
