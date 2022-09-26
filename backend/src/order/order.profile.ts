import { OrderDetailCommodity } from 'src/commodity/dto';
import { GetOrderCommodityDto } from './dto/GetOrderCommodityDto';
import { GetOrderDto, OrderInfoDto, OrderDto, OrderDetailDto } from './dto';
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
                OrderInfoDto,
                forMember(
                    (d) => d.quantity,
                    mapFrom((source) => {
                        return source.commodities.reduce(
                            (prev, curr) => prev + curr.quantity,
                            0,
                        );
                    }),
                ),
                forMember(
                    (d) => d.id,
                    mapFrom((source) => source._id),
                ),
                forMember(
                    (d) => d.totalPrice,
                    mapFrom((source) => {
                        return source.commodities.reduce(
                            (prev, curr) => prev + curr.price * curr.quantity,
                            0,
                        );
                    }),
                ),
            );
            createMap(
                mapper,
                Order,
                OrderDto,
                forMember(
                    (d) => d.quantity,
                    mapFrom((source) => {
                        return source.commodities.reduce(
                            (prev, curr) => prev + curr.quantity,
                            0,
                        );
                    }),
                ),
                forMember(
                    (d) => d.id,
                    mapFrom((source) => source._id),
                ),
                forMember(
                    (d) => d.totalPrice,
                    mapFrom((source) => {
                        return source.commodities.reduce(
                            (prev, curr) => prev + curr.price * curr.quantity,
                            0,
                        );
                    }),
                ),
                forMember(
                    (d) => d.customer,
                    mapFrom((source) => source.customer.name),
                ),
                forMember(
                    (d) => d.supplier,
                    mapFrom((source) => source.supplier.name),
                ),
            );
            createMap(
                mapper,
                Order,
                GetOrderDto,
                forMember(
                    (d) => d.commodities,
                    mapFrom((source) => {
                        const newCommoditys = source.commodities.map((c) => {
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
            createMap(
                mapper,
                Order,
                OrderDetailDto,
                forMember(
                    (d) => d.id,
                    mapFrom((source) => source._id),
                ),
                forMember(
                    (d) => d.commodities,
                    mapFrom((source) => {
                        const mapedCommodities = source.commodities.map(
                            (item) => {
                                return new OrderDetailCommodity(
                                    item.commodity._id,
                                    item.commodity.name,
                                    item.commodity.description,
                                    item.price,
                                    item.quantity,
                                );
                            },
                        );

                        return mapedCommodities;
                    }),
                ),
            );
        };
    }
}
