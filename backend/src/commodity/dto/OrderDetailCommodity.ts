import { Schema } from 'mongoose';

export class OrderDetailCommodity {
    constructor(
        id: Schema.Types.ObjectId,
        name: string,
        description: string,
        price: number,
        quantity: number,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
    }

    id: Schema.Types.ObjectId;
    name: string;
    description: string;
    price: number;
    quantity: number;
    supplierName: string;
    isCustomerPayForDelivery: boolean;
    status: string;
}
