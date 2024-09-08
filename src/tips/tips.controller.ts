import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards, Res, Query } from '@nestjs/common';
import { TipsService } from './tips.service';
import { CreateTipDto } from './dto/create-tip.dto';
import { UpdateTipDto } from './dto/update-tip.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { FindTipDto } from './dto/find-tip.dto';

@Controller('/api/tips')
export class TipsController {
  constructor(private readonly tipsService: TipsService) { }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createTip: CreateTipDto) {
    return this.tipsService.create(createTip);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query('page') page: string, @Query('limit') limit: string) {
    const findTip: FindTipDto = {
      page: null,
      limit: null,
    };

    findTip.limit = limit == undefined ? 5 : parseInt(limit);
    findTip.page =
      page == undefined ? 0 : findTip.limit * (parseInt(page) - 1);

    return {
      data: await this.tipsService.findAll(findTip),
      count: await this.tipsService.count(),
    };
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
