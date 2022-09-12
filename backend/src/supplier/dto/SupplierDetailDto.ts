import { SupplierCommodityInfo } from './';
import { Schema } from 'mongoose';

export class SupplierDetailDto {
    constructor(
        id: Schema.Types.ObjectId,
        name: string,
        lastPrice: number,
        bestOrderCommodities: SupplierCommodityInfo[],
    ) {
        this.id = id;
        this.name = name;
        this.lastPrice = lastPrice;
        this.bestOrderCommodities = bestOrderCommodities;
    }

    id: Schema.Types.ObjectId;
    name: string;
    lastPrice: number;
    bestOrderCommodities?: SupplierCommodityInfo[];
}
