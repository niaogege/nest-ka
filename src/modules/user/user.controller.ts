import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdatePasswordDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  getUserList(@Query() query: { page: number; size: number }) {
    return this.userService.findAll(query);
  }

  @Get(':username')
  findByUsername(@Param('username') username: string) {
    return this.userService.findByUsername(username);
  }

  @Get('/info/:id')
  findByUserId(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  /** 管理员重置密码 */
  @Patch('/reset/password/:userId')
  resetPassword(
    @Param('userId') userId: number,
    @Body() dto: UpdatePasswordDto,
  ) {
    return this.userService.resetPassword(userId, dto.password);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteOne(id);
  }
}
