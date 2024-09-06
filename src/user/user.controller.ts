import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import * as bcrypt from 'bcrypt';

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    if (createUserDto.password != createUserDto.verify_password) {
      throw new HttpException(
        'As senhas devem ser iguais',
        HttpStatus.BAD_REQUEST,
      );
    }
    const userAlreadyExists = await this.userService.findByEmail(
      createUserDto.email,
    );

    if (userAlreadyExists?.email != undefined) {
      throw new HttpException(
        'Já existe um usuário com esse e-mail cadastrado',
        HttpStatus.BAD_REQUEST,
      );
    }

    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await this.userService.create(createUserDto);

    return this.userService.findOne(newUser.id);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('cadastraoprimeirousuariopqeunaoseicomofazerkkkj')
  async createFirstUser(@Body() createUserDto: CreateUserDto) {
    if (createUserDto.password != createUserDto.verify_password) {
      throw new HttpException(
        'As senhas devem ser iguais',
        HttpStatus.BAD_REQUEST,
      );
    }
    const userAlreadyExists = await this.userService.findByEmail(
      createUserDto.email,
    );

    if (userAlreadyExists?.email != undefined) {
      throw new HttpException(
        'Já existe um usuário com esse e-mail cadastrado',
        HttpStatus.BAD_REQUEST,
      );
    }

    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await this.userService.create(createUserDto);

    return this.userService.findOne(newUser.id);
  }
}
