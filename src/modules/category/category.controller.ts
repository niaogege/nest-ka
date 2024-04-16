import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
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

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto, @Req() req) {
    const user = req[REQUEST_USER_KEY];
    createCategoryDto.userId = user.userId;
    return this.categoryService.create(createCategoryDto);
  }

  @Get('list')
  findAllList(@Query() query: { page: number; size: number }) {
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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
