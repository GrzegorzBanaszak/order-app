import { AutoMap } from '@automapper/classes';
import { Schema } from 'mongoose';

export class PostCustomerDto {
    @AutoMap()
    name: string;
    @AutoMap()
    number: number;
    @AutoMap()
    company: Schema.Types.ObjectId;
}
