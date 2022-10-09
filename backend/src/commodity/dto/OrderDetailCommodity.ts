import { Schema } from 'mongoose';

export class OrderDetailCommodity {
    constructor(
        id: Schema.Types.ObjectId,
        name: string,
        description: string,
        price: number,
        quantity: number,
        isCustomerPayForDelivery: boolean,
        supplierName: string,
        status: string,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.isCustomerPayForDelivery = isCustomerPayForDelivery;
        this.supplierName = supplierName;
        this.status = status;
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
