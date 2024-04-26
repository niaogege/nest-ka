import { Injectable, BadRequestException } from '@nestjs/common';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  QueryCategoryDto,
} from './category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Category } from './category.entity';
import { AccountService } from '../account/account.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRep: Repository<Category>,
    private accountService: AccountService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRep.create(createCategoryDto);
    // userId != 0 代表为某一账本所共有
    if (createCategoryDto.userId != 0 && createCategoryDto.accountId) {
      const curAccount = await this.accountService.findOne(
        createCategoryDto.accountId,
      );
      if (curAccount.userId !== createCategoryDto.userId) {
        throw new BadRequestException('当前账本不是当前用户创建的');
      }
      category.shareAccount = curAccount;
    }
    return await this.categoryRep.save(category);
  }

  async findAll(userId: number) {
    console.log(userId, 'userId');
    return await this.categoryRep.find({
      where: {
        userId,
      },
      relations: {
        shareAccount: true,
      },
    });
  }

  async findAllList(query: QueryCategoryDto) {
    const { page, size, userId } = query;
    console.log(query, 'query');
    const [categorys, total] = await this.categoryRep.findAndCount({
      skip: (page - 1) * size, // offset11
      take: size, // limit
      where: {
        userId: In([userId, 0]),
        // shareAccountId: +accountId,
      },
    });
    return { categorys, total };
  }
  async findOne(id: number) {
    return await this.categoryRep.findOne({
      where: { id },
      relations: {
        bills: true,
      },
    });
  }

  // userId:0 代码默认所有用户共享
  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const curCategory = await this.findOne(id);
    if (!curCategory) {
      throw new BadRequestException('当前类目不存在');
    }
    if (updateCategoryDto.userId != 0 && updateCategoryDto.accountId) {
      const curAccount = await this.accountService.findOne(
        updateCategoryDto.accountId,
      );
      if (curAccount.userId !== updateCategoryDto.userId) {
        throw new BadRequestException('当前类目不是当前账本创建的');
      }
      curCategory.shareAccount = curAccount;
    }
    const newCategory = this.categoryRep.merge(curCategory, updateCategoryDto);
    return await this.categoryRep.save(newCategory);
  }

  async remove(id: number, userId: number) {
    const curCategory = await this.findOne(id);
    if (curCategory.userId !== userId) {
      throw new BadRequestException('当前类目不是本人创建的，无权删除');
    }
    await this.categoryRep.delete(id);
    return true;
  }
}
