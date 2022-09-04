import { GetCompanyDto } from './../../company/dto/GetCompanyDto';
import { AutoMap } from '@automapper/classes';
import { Schema } from 'mongoose';

export class GetCustomerDto {
    @AutoMap()
    _id: Schema.Types.ObjectId;

    @AutoMap()
    name: string;

    @AutoMap()
    phoneNumber: string;

    @AutoMap()
    company?: GetCompanyDto;
}
