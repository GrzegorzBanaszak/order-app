import { GetCompanyDto } from './../../company/dto/GetCompanyDto';
import { AutoMap } from '@automapper/classes';

export class GetCustomerDto {
    @AutoMap()
    _id: string;

    @AutoMap()
    name: string;

    @AutoMap()
    number: number;

    @AutoMap()
    company: GetCompanyDto;
}
