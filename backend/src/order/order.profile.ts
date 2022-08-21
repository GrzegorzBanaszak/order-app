import { GetOrderCommodityDto } from './dto/GetOrderCommodityDto';
import { GetOrderDto } from './dto';
import {
    Mapper,
    MappingProfile,
    createMap,
    forMember,
    mapFrom,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Order } from './order.schema';

@Injectable()
export class OrderProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile(): MappingProfile {
        return (mapper) => {
            createMap(
                mapper,
                Order,
                GetOrderDto,
                forMember(
                    (d) => d.commoditys,
                    mapFrom((source) => {
                        const newCommoditys = source.commoditys.map((c) => {
                            return new GetOrderCommodityDto(
                                c.commodity._id,
                                c.commodity.name,
                                c.commodity.description,
                                c.price,
                                c.quantity,
                            );
                        });
                        return newCommoditys;
                    }),
                ),
            );
        };
    }
}
