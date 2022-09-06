import { GetCustomerDto } from 'src/customer/dto';
import { PostCustomerDto } from './dto/PostCustomerDto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from './customer.schema';
import { Order, OrderDocument } from 'src/order/order.schema';

@Injectable()
export class CustomerService {
    constructor(
        @InjectModel(Customer.name)
        private customerModel: Model<CustomerDocument>,
        @InjectModel(Order.name)
        private orderModel: Model<OrderDocument>,
    ) {}

    async getAll(): Promise<GetCustomerDto[]> {
        const customers = await this.customerModel.find();

        const customersDto: GetCustomerDto[] = [];

        for (const customer of customers) {
            const lastOrder = await this.orderModel
                .findOne({ customer: customer._id })
                .sort('-createdAt')
                .limit(1);

            if (lastOrder) {
                customersDto.push(
                    new GetCustomerDto(
                        customer._id,
                        customer.name,
                        customer.phoneNumber,
                        lastOrder.createdAt,
                    ),
                );
            } else {
                customersDto.push(
                    new GetCustomerDto(
                        customer._id,
                        customer.name,
                        customer.phoneNumber,
                    ),
                );
            }
        }

        return customersDto;
    }

    async add(data: PostCustomerDto): Promise<Customer> {
        const customer = new this.customerModel(data);

        return await customer.save();
    }

    async update(id: string, data: PostCustomerDto): Promise<Customer> {
        const updatedCustomer = await this.customerModel.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
            },
        );

        if (!updatedCustomer) {
            throw new NotFoundException();
        }

        return updatedCustomer;
    }

    async delete(id: string): Promise<string> {
        await this.customerModel.findByIdAndDelete(id);

        return id;
    }
}
