import { AutoMap } from '@automapper/classes';
import { Schema } from 'mongoose';

export class PostCustomerDto {
    @AutoMap()
    name: string;
    @AutoMap()
    phoneNumber: number;
    @AutoMap()
    company?: Schema.Types.ObjectId;
}
