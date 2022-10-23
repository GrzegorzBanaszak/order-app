import { AutoMap } from '@automapper/classes';
import { Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Schema } from 'mongoose';

export class PostCustomerDto {
    @AutoMap()
    @IsString()
    @IsNotEmpty({ message: 'Podaj imie i nazwisko' })
    name: string;

    @AutoMap()
    @IsString()
    @IsNotEmpty({ message: 'Podaj numer telefonu' })
    phoneNumber: string;

    @AutoMap()
    @IsMongoId()
    company?: Schema.Types.ObjectId;
}
