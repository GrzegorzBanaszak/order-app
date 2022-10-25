import { Schema } from 'mongoose';

export class OrderDetailCommodity {
    constructor(
        id: Schema.Types.ObjectId,
        name: string,
        description: string,
        price: number,
        quantity: number,
        deliveryPrice: number,
        supplierName: string,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.deliveryPrice = deliveryPrice;
        this.supplierName = supplierName;
    }

    id: Schema.Types.ObjectId;
    name: string;
    description: string;
    price: number;
    quantity: number;
    supplierName: string;
    deliveryPrice: number;
}
