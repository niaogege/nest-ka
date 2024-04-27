import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  Request,
  Query,
  Put,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto, UpdateAccountDto } from './account.dto';
import { REQUEST_USER_KEY } from '@/common/constants';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto, @Req() req: Request) {
    const user = req[REQUEST_USER_KEY];
    createAccountDto.userId = user.userId;
    return this.accountService.create(createAccountDto);
  }

  @Get('list')
  findAllList(@Query() query: { page: number; size: number }) {
    return this.accountService.findAllList(query);
  }

  @Get()
  findAll(@Query() query: { userId: number }) {
    return this.accountService.findAll(query.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
    @Req() req: Request,
  ) {
    const user = req[REQUEST_USER_KEY];
    updateAccountDto.userId = user.userId;
    return this.accountService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountService.remove(+id);
  }
}
