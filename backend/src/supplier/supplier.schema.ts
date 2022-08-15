import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SupplierDocument = Supplier & Document;

@Schema()
export class Supplier {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  nip: string;
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);
