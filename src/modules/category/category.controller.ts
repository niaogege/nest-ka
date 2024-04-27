import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';
import { REQUEST_USER_KEY } from '@/common/constants';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // userId:0 默认类目
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto, @Req() req) {
    const user = req[REQUEST_USER_KEY];
    if (createCategoryDto.userId != 0) {
      createCategoryDto.userId = user.userId;
    }
    return this.categoryService.create(createCategoryDto);
  }

  @Get('list')
  findAllList(
    @Query()
    query: { page: number; size: number; accountId: number; userId: number },
    @Req() req,
  ) {
    const user = req[REQUEST_USER_KEY];
    query.userId = +user.userId;
    return this.categoryService.findAllList(query);
  }

  @Get()
  findAll(@Req() req) {
    const user = req[REQUEST_USER_KEY];
    return this.categoryService.findAll(user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    const user = req[REQUEST_USER_KEY];
    return this.categoryService.remove(+id, +user.userId);
  }
}
