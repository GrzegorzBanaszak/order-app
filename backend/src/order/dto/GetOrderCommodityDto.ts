import { AutoMap } from '@automapper/classes';
import { Schema } from 'mongoose';

export class GetOrderCommodityDto {
    constructor(
        id: Schema.Types.ObjectId,
        name: string,
        description: string,
        price: number,
        quantity: number,
    ) {
        this._id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
    }

    @AutoMap()
    _id: Schema.Types.ObjectId;

    @AutoMap()
    name: string;

    @AutoMap()
    description: string;

    @AutoMap()
    price: number;

    @AutoMap()
    quantity: number;
}
