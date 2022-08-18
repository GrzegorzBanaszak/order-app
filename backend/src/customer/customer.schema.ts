import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as SchemaType } from 'mongoose';
import { Company } from 'src/company/company.schema';

export type CustomerDocument = Customer & Document;

@Schema({ timestamps: true })
export class Customer {
    @AutoMap()
    @Prop({ auto: true })
    _id: string;

    @AutoMap()
    @Prop({ required: true })
    name: string;

    @AutoMap()
    @Prop()
    number: number;

    @AutoMap()
    @Prop({ type: SchemaType.Types.ObjectId, ref: 'Company' })
    company: Company;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
