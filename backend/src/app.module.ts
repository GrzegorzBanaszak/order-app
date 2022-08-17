import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommodityModule } from './commodity/commodity.module';
import { SupplierModule } from './supplier/supplier.module';
import { CompanyModule } from './company/company.module';
import { CustomerModule } from './customer/customer.module';
import { OrderModule } from './order/order.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

@Module({
    imports: [
        AuthModule,
        CommodityModule,
        SupplierModule,
        CompanyModule,
        CustomerModule,
        OrderModule,
        MongooseModule.forRoot('mongodb://localhost:27017/orders'),
        AutomapperModule.forRoot({
            strategyInitializer: classes(),
        }),
    ],
})
export class AppModule {}
