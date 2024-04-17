import { Module, Global } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from './bill.entity';
// 账单表
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Bill])],
  controllers: [BillController],
  providers: [BillService],
})
export class BillModule {}
