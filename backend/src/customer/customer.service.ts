import { PostCustomerDto } from './dto/PostCustomerDto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from './customer.schema';

@Injectable()
export class CustomerService {
    constructor(
        @InjectModel(Customer.name)
        private customerModel: Model<CustomerDocument>,
    ) {}

    async getAll(): Promise<Customer[]> {
        return await this.customerModel.find().populate('company');
    }

    async add(data: PostCustomerDto): Promise<Customer> {
        const customer = new this.customerModel(data);
        customer.populate('company');
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
