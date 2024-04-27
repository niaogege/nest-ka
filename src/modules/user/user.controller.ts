import {
  Controller,
  Get,
  Post,
  Request,
  Body,
  Param,
  Delete,
  Query,
  Req,
  Put,
} from '@nestjs/common';
import { REQUEST_USER_KEY } from '@/common/constants';
import { UserService } from './user.service';
import { UpdateUserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  getUserList(@Query() query: { page: number; size: number }) {
    return this.userService.findAll(query);
  }

  @Get('info')
  getUserInfo(@Req() req: Request) {
    const user = req[REQUEST_USER_KEY];
    console.log(user, 'user');
    return this.userService.findOne(+user.userId);
  }

  @Get(':openid')
  findByUseropenid(@Param('openid') openid: string) {
    return this.userService.findByUseropenid(openid);
  }

  @Get('/info/many')
  findMany(@Query() query: { ids: string }) {
    const ids = query.ids.split(',').map((e) => +e);
    return this.userService.findMany(ids);
  }

  @Get('/info/:id')
  findByUserId(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  /** 管理员重置密码 */
  // @Put('/reset/password/:userId')
  // resetPassword(
  //   @Param('userId') userId: number,
  //   @Body() dto: UpdatePasswordDto,
  // ) {
  //   return this.userService.resetPassword(userId, dto.password);
  // }

  // 更新昵称或者头像
  @Put(':id')
  updateUser(@Param('id') id: number, @Body() updateInfo: UpdateUserDto) {
    this.userService.update(+id, updateInfo);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteOne(id);
  }
}
