import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Request,
  Query,
} from '@nestjs/common';
import { BillService } from './bill.service';
import { CreateBillDto, UpdateBillDto, QueryBillDto } from './bill.dto';
import { REQUEST_USER_KEY } from '@/common/constants';
@Controller('bill')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Post()
  create(@Body() createBillDto: CreateBillDto, @Req() req: Request) {
    const user = req[REQUEST_USER_KEY];
    createBillDto.userId = user.userId;
    return this.billService.create(createBillDto);
  }

  // 查询当前用户的所有账单进行分页
  @Get('list')
  findAll(@Query() query: QueryBillDto, @Req() req: Request) {
    const user = req[REQUEST_USER_KEY];
    const conditions = {
      ...query,
      userId: user.userId,
    };
    return this.billService.findAll(conditions);
  }

  // 根据账单id进行查询
  @Get(':id')
  findOne(@Param('id') id: number, @Req() req: Request) {
    const user = req[REQUEST_USER_KEY];
    return this.billService.findOne(id, user.userId);
  }

  // 根据某一类型的账单
  @Get('/type/:typeId')
  findOneType(@Param() typeId: number) {
    return this.billService.findOneType(typeId);
  }

  // 根据账单id更新账单
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBillDto: UpdateBillDto,
    @Req() req: Request,
  ) {
    const user = req[REQUEST_USER_KEY];
    updateBillDto.userId = user.userId;
    return this.billService.update(+id, updateBillDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    const user = req[REQUEST_USER_KEY];
    return this.billService.remove(+id, user.userId);
  }
}
