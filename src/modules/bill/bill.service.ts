import { Injectable, Req } from '@nestjs/common';
import { CreateBillDto, UpdateBillDto, QueryBillDto } from './bill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { Bill } from './bill.entity';
@Injectable()
export class BillService {
  constructor(@InjectRepository(Bill) private billRep: Repository<Bill>) {}

  async create(bill: CreateBillDto) {
    return await this.billRep.save(bill);
  }

  async findAll(query: QueryBillDto) {
    const { page, size, userId } = query;
    const [bills, total] = await this.billRep.findAndCount({
      skip: (page - 1) * size,
      take: size,
      where: {
        userId,
      },
    });
    return { bills, total };
  }

  update(id: number, updateBillDto: UpdateBillDto) {
    return `This action updates a #${id} bill`;
  }

  remove(id: number) {
    return this.billRep.delete(id);
  }
}
