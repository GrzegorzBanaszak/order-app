import { CommoditySupplier } from './';
import { Schema } from 'mongoose';

export class CommodityDetailDto {
    constructor(
        id: Schema.Types.ObjectId,
        name: string,
        description: string,
        suppliers: CommoditySupplier[],
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.suppliers = suppliers;
    }

    id: Schema.Types.ObjectId;
    name: string;
    description: string;
    suppliers: CommoditySupplier[];
}
