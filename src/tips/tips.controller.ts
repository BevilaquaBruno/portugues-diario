import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards, Res } from '@nestjs/common';
import { TipsService } from './tips.service';
import { CreateTipDto } from './dto/create-tip.dto';
import { UpdateTipDto } from './dto/update-tip.dto';
import { returnDbDateFormatted } from 'src/helper';
import { AuthGuard } from 'src/auth/auth.guard';
import { Response } from 'express';

@Controller('tips')
export class TipsController {
  constructor(private readonly tipsService: TipsService) { }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createTip: CreateTipDto) {
    return this.tipsService.create(createTip);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.tipsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('/:id(\\d+)')
  findOne(@Param('id') id: string) {
    return this.tipsService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id(\\d+)')
  update(@Param('id') id: string, @Body() updateTipDto: UpdateTipDto) {
    return this.tipsService.update(+id, updateTipDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id(\\d+)')
  remove(@Param('id') id: string) {
    return this.tipsService.remove(+id);
  }

  @UseGuards(AuthGuard)
  @Get('/like/:id(\\d+)')
  likeTip(@Param('id') id: string) {
    return this.tipsService.likeTip(+id);
  }

  @UseGuards(AuthGuard)
  @Get('/dislike/:id(\\d+)')
  dislikeTip(@Param('id') id: string) {
    return this.tipsService.dislikeTip(+id);
  }

  @UseGuards(AuthGuard)
  @Get('/reset')
  reset() {
    return this.tipsService.reset();
  }
}
