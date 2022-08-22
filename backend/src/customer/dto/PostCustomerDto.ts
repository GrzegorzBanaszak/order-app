import { AutoMap } from '@automapper/classes';
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Schema } from 'mongoose';

export class PostCustomerDto {
    @AutoMap()
    @IsString()
    @IsNotEmpty()
    name: string;

    @AutoMap()
    @IsNumber()
    @IsNotEmpty()
    phoneNumber: number;

    @AutoMap()
    @IsMongoId()
    company?: Schema.Types.ObjectId;
}
