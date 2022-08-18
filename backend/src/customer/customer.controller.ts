import { GetCustomerDto } from './dto/GetCustomerDto';
import { Customer } from './customer.schema';
import { MapInterceptor } from '@automapper/nestjs';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomerService) {}

    @Get()
    @UseInterceptors(
        MapInterceptor(Customer, GetCustomerDto, { isArray: true }),
    )
    async getAll() {
        return await this.customerService.getAll();
    }
}
