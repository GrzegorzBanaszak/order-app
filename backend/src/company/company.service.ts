import { PostCompanyDto } from './dto/PostComapnyDto';
import { Company, CompanyDocument } from './company.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CompanyService {
    constructor(
        @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
    ) {}

    async getAll(): Promise<Company[]> {
        return await this.companyModel.find();
    }

    async add(data: PostCompanyDto): Promise<Company> {
        const company = new this.companyModel(data);
        return await company.save();
    }

    async update(id: string, data: PostCompanyDto): Promise<Company> {
        const updatedCompany = await this.companyModel.findByIdAndUpdate(
            id,
            data,
            { new: true },
        );

        if (!updatedCompany) {
            throw new NotFoundException();
        }

        return updatedCompany;
    }

    async delete(id: string): Promise<string> {
        await this.companyModel.findByIdAndDelete(id);

        return id;
    }
}
