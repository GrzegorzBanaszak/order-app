import { GetCompanyDto } from './../../company/dto/GetCompanyDto';
import { AutoMap } from '@automapper/classes';
import { Schema } from 'mongoose';

export class GetCustomerDto {
    constructor(
        id: Schema.Types.ObjectId,
        name: string,
        phoneNumber: string,
        lastOrder?: Date,
    ) {
        this._id = id;
        this.name = name;
        this.phoneNumber = phoneNumber;
        if (lastOrder) {
            this.lastOrder = lastOrder;
        }
    }

    @AutoMap()
    _id: Schema.Types.ObjectId;

    @AutoMap()
    name: string;

    @AutoMap()
    phoneNumber: string;

    @AutoMap()
    company?: GetCompanyDto;

    lastOrder?: Date;
}
