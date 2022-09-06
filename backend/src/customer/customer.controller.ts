import { PostCustomerDto } from './dto/PostCustomerDto';
import { GetCustomerDto } from './dto/GetCustomerDto';
import { Customer } from './customer.schema';
import { MapInterceptor } from '@automapper/nestjs';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { AuthGuard } from '@nestjs/passport';

// @UseGuards(AuthGuard('jwt'))
@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomerService) {}

    @Get()
    // @UseInterceptors(
    //     MapInterceptor(Customer, GetCustomerDto, { isArray: true }),
    // )
    async getAll() {
        return await this.customerService.getAll();
    }

    @Post('add')
    @UseInterceptors(MapInterceptor(Customer, GetCustomerDto))
    async add(@Body() data: PostCustomerDto) {
        return await this.customerService.add(data);
    }

    @Put('update/:id')
    @UseInterceptors(MapInterceptor(Customer, GetCustomerDto))
    async update(@Param() params: any, @Body() data: PostCustomerDto) {
        return await this.customerService.update(params.id, data);
    }

    @Delete('delete/:id')
    async delete(@Param() params: any) {
        return await this.customerService.delete(params.id);
    }
}
