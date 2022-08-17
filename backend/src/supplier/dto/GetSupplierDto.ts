import { AutoMap } from '@automapper/classes';

export class GetSupplierDto {
    @AutoMap()
    _id: string;
    @AutoMap()
    name: string;
    @AutoMap()
    price: number;
}
