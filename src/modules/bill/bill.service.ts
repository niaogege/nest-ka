import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository, Between } from 'typeorm';
import dayjs from 'dayjs';
import { CreateBillDto, UpdateBillDto, QueryBillDto } from './bill.dto';
import { Bill } from './bill.entity';
import { AccountService } from '../account/account.service';
import { CategoryService } from '../category/category.service';
import { getAmount, transferData } from '../../utils';
@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill) private billRep: Repository<Bill>,
    private accountService: AccountService,
    private categoryService: CategoryService,
  ) {}

  async create(bill: CreateBillDto) {
    bill.ctime = dayjs(bill.ctime).format();
    const curBill = this.billRep.create(bill);
    if (bill.accountId) {
      curBill.shareAccount = await this.accountService.findOne(+bill.accountId);
    }
    if (bill.categoryId) {
      curBill.category = await this.categoryService.findOne(+bill.categoryId);
    }
    return await this.billRep.save(curBill);
  }

  /**
   * 需要转换格式
   * 拿到当前账本列表+时间过滤
   * @param query
   * @returns
   */
  async findAll(query: QueryBillDto) {
    const {
      page = 1,
      size = 10,
      userId,
      accountId,
      startTime,
      endTime,
      categoryId,
    } = query;
    const sTime = dayjs(startTime).startOf('d').toDate();
    const eTime = dayjs(endTime).endOf('d').toDate();
    const [bills] = await this.billRep.findAndCount({
      where: {
        userId,
        shareAccountId: +accountId,
        ctime: Between(sTime, eTime),
        categoryId,
      },
      order: {
        ctime: 'DESC',
      },
      relations: {
        category: true,
      },
    });
    let listFlat = transferData(bills);
    listFlat = listFlat.map((item) => {
      const { bills } = item;
      item.totalExpense = getAmount(bills, 1); // 支出
      item.totalIncome = getAmount(bills, 2); // 收入
      item.titleDate = dayjs(item.date).date();
      item.day = dayjs(item.date).format('dddd');
      return item;
    });
    // 分页
    listFlat = listFlat.slice((page - 1) * size, page * size);
    // 总计支出
    const totalExpense = getAmount(bills, 1);
    // 总计收入
    const totalIncome = getAmount(bills, 2);
    return {
      bills: listFlat,
      totalExpense,
      totalIncome,
      remain: totalIncome - totalExpense, // 结余
    };
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
    console.log(categoryId, 'categoryId');
    return this.billRep.find({
      where: {
        categoryId,
      },
    });
  }
}
