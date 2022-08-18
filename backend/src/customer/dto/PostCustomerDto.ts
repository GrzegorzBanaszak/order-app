import { Schema } from 'mongoose';

export class PostCustomerDto {
    name: string;
    number: number;

    company: Schema.Types.ObjectId;
}
