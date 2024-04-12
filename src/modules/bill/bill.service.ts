import { Injectable, BadRequestException } from '@nestjs/common';
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
      skip: (page - 1) * size, // offset
      take: size, // limit
      where: {
        userId,
      },
    });
    return { bills, total };
  }

  async findOne(id: number, userId) {
    const curBill = await this.billRep.findOne({
      where: [{ id, userId }],
    });
    if (!curBill) {
      throw new BadRequestException('账单不存在或者已删除');
    }
    return curBill;
  }

  async update(id: number, updateBillDto: UpdateBillDto) {
    const curBill = await this.findOne(id, updateBillDto.userId);
    const newBill = this.billRep.merge(curBill, updateBillDto);
    return await this.billRep.save(newBill);
  }

  async remove(id: number, userId: number) {
    await this.findOne(id, userId);
    return this.billRep.delete(id);
  }

  // 获取单一账单类目的用户信息
  findOneType(categoryId: number) {
    return this.billRep.find({
      where: {
        categoryId,
      },
    });
  }
}
