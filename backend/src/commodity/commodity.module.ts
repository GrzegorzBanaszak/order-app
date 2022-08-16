import { Commodity, CommoditySchema } from './commodity.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CommodityService } from './commodity.service';
import { CommodityController } from './commodity.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Commodity.name, schema: CommoditySchema },
    ]),
  ],
  controllers: [CommodityController],
  providers: [CommodityService],
})
export class CommodityModule {}
