import { Commodity, CommodityDocument } from './commodity.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostCommodityDto } from './dto';

@Injectable()
export class CommodityService {
  constructor(
    @InjectModel(Commodity.name)
    private commodityModel: Model<CommodityDocument>,
  ) {}

  async getAll(): Promise<Commodity[]> {
    return await this.commodityModel.find();
  }

  async add(data: PostCommodityDto): Promise<Commodity> {
    const commodity = new this.commodityModel(data);
    return await commodity.save();
  }

  async update(id: string, data: PostCommodityDto): Promise<Commodity> {
    const updatedCommodity = await this.commodityModel.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
      },
    );

    if (!updatedCommodity) {
      throw new NotFoundException();
    }

    return updatedCommodity;
  }

  async delete(id: string): Promise<string> {
    await this.commodityModel.findByIdAndDelete(id);
    return id;
  }
}
