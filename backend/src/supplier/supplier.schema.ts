import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SupplierDocument = Supplier & Document;

@Schema({ timestamps: true })
export class Supplier {
    @AutoMap()
    @Prop({ auto: true })
    _id: string;

    @AutoMap()
    @Prop({ required: true })
    name: string;

    @AutoMap()
    @Prop()
    price: string;

    @AutoMap()
    @Prop()
    createdAt?: Date;
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);
