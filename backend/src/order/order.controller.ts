import { GetOrderDto } from './dto/GetOrderGto';
import { Order } from './order.schema';
import { PostOrderDto } from './dto/PostOrderDto';
import { OrderService } from './order.service';
import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { MapInterceptor } from '@automapper/nestjs';
import { AuthGuard } from '@nestjs/passport';
import { OrderInfoDto } from './dto';

// @UseGuards(AuthGuard('jwt'))
@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) {}

    @Get()
    @UseInterceptors(MapInterceptor(Order, GetOrderDto, { isArray: true }))
    async getAll() {
        return await this.orderService.getAll();
    }

    @Get('last/:range')
    @UseInterceptors(MapInterceptor(Order, GetOrderDto, { isArray: true }))
    async getAtRange(@Param('range', ParseIntPipe) range: number) {
        return await this.orderService.getAtRange(range);
    }

    @Get('best/customers')
    async getBestCustomers() {
        return await this.orderService.getBestCustomers();
    }

    @Get('best/commodities')
    async getBestCommodities() {
        return await this.orderService.getBestCommodities();
    }

    @Get('customer/:id')
    @UseInterceptors(MapInterceptor(Order, OrderInfoDto, { isArray: true }))
    async getOrdersByCustomer(@Param('id') id: string) {
        return await this.orderService.getOrdersByCustomer(id);
    }

    @Post('add')
    async add(@Body() data: PostOrderDto) {
        return await this.orderService.add(data);
    }
}
