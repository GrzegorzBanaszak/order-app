import { AutoMap } from '@automapper/classes';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Schema } from 'mongoose';

export class PostCustomerDto {
    @AutoMap()
    @IsString()
    @IsNotEmpty()
    name: string;

    @AutoMap()
    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @AutoMap()
    @IsMongoId()
    company?: Schema.Types.ObjectId;
}
