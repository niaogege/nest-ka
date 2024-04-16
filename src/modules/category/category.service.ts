import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    if (createCategoryDto.shareAccountId) {
      const curAccount = await this.accountService.findOne(
        createCategoryDto.shareAccountId,
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

  async findAllList(query) {
    const { page, size } = query;
    const [categorys, total] = await this.categoryRep.findAndCount({
      skip: (page - 1) * size, // offset
      take: size, // limit
    });
    return { categorys, total };
  }
  async findOne(id: number) {
    return await this.categoryRep.find({
      where: { id },
      relations: {
        bills: true,
      },
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
