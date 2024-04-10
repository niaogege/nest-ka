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

  @Get()
  findAll(@Query() query: { page; size }, @Req() req: Request) {
    const user = req[REQUEST_USER_KEY];
    const conditions = {
      ...query,
      userId: user.userId,
    };
    return this.billService.findAll(conditions);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBillDto: UpdateBillDto) {
    return this.billService.update(+id, updateBillDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billService.remove(+id);
  }
}
