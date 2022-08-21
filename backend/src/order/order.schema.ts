import { Commodity } from './../commodity/commodity.schema';
import { Supplier } from './../supplier/supplier.schema';
import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as SchemaType } from 'mongoose';
import { Customer } from 'src/customer/customer.schema';
export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
    @AutoMap()
    @Prop({ auto: true })
    _id: SchemaType.Types.ObjectId;

    @AutoMap()
    @Prop({ type: SchemaType.Types.ObjectId, ref: 'Customer' })
    customer: Customer;

    @AutoMap()
    @Prop({ type: SchemaType.Types.ObjectId, ref: 'Supplier' })
    supplier: Supplier;

    @AutoMap()
    @Prop([Object])
    commoditys: OrderCommodity[];

    @AutoMap()
    @Prop()
    status: string;

    @AutoMap()
    @Prop()
    advance?: number;
}

export class OrderCommodity {
    @Prop({ type: SchemaType.Types.ObjectId, ref: 'Commodity' })
    commodity: Commodity;

    @Prop()
    price: number;

    @Prop()
    quantity: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
