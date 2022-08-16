import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SupplierDocument = Supplier & Document;

@Schema({ timestamps: true })
export class Supplier {
  @Prop()
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  price: string;

  @Prop()
  createdAt?: Date;
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);
