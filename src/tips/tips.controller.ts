import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipsService } from './tips.service';
import { CreateTipDto } from './dto/create-tip.dto';
import { UpdateTipDto } from './dto/update-tip.dto';

@Controller('tips')
export class TipsController {
  constructor(private readonly tipsService: TipsService) {}

  @Post()
  create(@Body() createTip: CreateTipDto) {
    return this.tipsService.create(createTip);
  }

  @Get()
  findAll() {
    return this.tipsService.findAll();
  }

  @Get('/:id(\\d+)')
  findOne(@Param('id') id: string) {
    return this.tipsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipDto: UpdateTipDto) {
    return this.tipsService.update(+id, updateTipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipsService.remove(+id);
  }

  @Get('/like/:id')
  likeTip(@Param('id') id: string) {
    return this.tipsService.likeTip(+id);
  }

  @Get('/dislike/:id')
  dislikeTip(@Param('id') id: string) {
    return this.tipsService.dislikeTip(+id);
  }

  @Get('/reset')
  reset() {
    return this.tipsService.reset();
  }
}
