import { PostCustomerDto } from './dto/PostCustomerDto';
import { Injectable } from '@nestjs/common';
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
        const supplier = new this.customerModel(data);
        return await supplier.save();
    }
}
