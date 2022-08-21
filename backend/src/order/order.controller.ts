import { GetOrderDto } from './dto/GetOrderGto';
import { Order } from './order.schema';
import { PostOrderDto } from './dto/PostOrderDto';
import { OrderService } from './order.service';
import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { MapInterceptor } from '@automapper/nestjs';

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) {}

    @Get()
    @UseInterceptors(MapInterceptor(Order, GetOrderDto, { isArray: true }))
    async getAll() {
        return await this.orderService.getAll();
    }

    @Post('add')
    async add(@Body() data: PostOrderDto) {
        return await this.orderService.add(data);
    }
}
