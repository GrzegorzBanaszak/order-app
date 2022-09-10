import { AutoMap } from '@automapper/classes';

export class OrderInfoDto {
    @AutoMap()
    orderNumber: string;

    @AutoMap()
    createdAt: Date;

    @AutoMap()
    status: string;

    quantity: number;

    totalPrice: number;
}
