import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaType } from 'mongoose';

export type CommodityDocument = Commodity & Document;

@Schema({ timestamps: true })
export class Commodity {
  @Prop()
  _id: SchemaType.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;

  @Prop()
  description: string;
}

export const CommoditySchema = SchemaFactory.createForClass(Commodity);
