import { AutoMap } from '@automapper/classes';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
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
    @Type(() => ObjectId)
    company?: Schema.Types.ObjectId;
}
