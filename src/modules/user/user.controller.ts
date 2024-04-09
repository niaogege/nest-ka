import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get(':username')
  findByUsername(@Param('username') username: string) {
    console.log('name');
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
}
