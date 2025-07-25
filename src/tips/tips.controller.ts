import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards, Res, Query, Inject, UseInterceptors, UploadedFile } from '@nestjs/common';
import { TipsService } from './tips.service';
import { CreateTipDto } from './dto/create-tip.dto';
import { UpdateTipDto } from './dto/update-tip.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { FindTipDto } from './dto/find-tip.dto';
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from 'cache-manager';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/api/tips')
export class TipsController {
  constructor(private readonly tipsService: TipsService, @Inject(CACHE_MANAGER) private cacheManager: Cache,) { }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createTip: CreateTipDto) {
    return this.tipsService.create(createTip);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query('page') page: string, @Query('limit') limit: string) {
    const findTip: FindTipDto = {
      page: 1,
      limit: 10,
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
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.tipsService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipDto: UpdateTipDto) {
    return this.tipsService.update(+id, updateTipDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipsService.remove(+id);
  }

  @Get('/like/:id')
  async likeTip(@Param('id') id: string) {
    // pega a dica do cache atual
    let todayTip: any = await this.cacheManager.get('todayTip');

    // se ela existir, adiciona um like nela e coloca no cache de novo
    if (undefined != todayTip) {
      todayTip.likes = todayTip.likes + 1;
      await this.cacheManager.set('todayTip', todayTip, 0);
    }

    // adiciona o like no banco
    return this.tipsService.likeTip(+id);
  }

  @Get('/dislike/:id')
  async dislikeTip(@Param('id') id: string) {
    // pega a dica do cache atual
    let todayTip: any = await this.cacheManager.get('todayTip');

    // se ela existir, adiciona um like nela e coloca no cache de novo
    if (undefined != todayTip) {
      todayTip.likes = todayTip.likes - 1;
      await this.cacheManager.set('todayTip', todayTip, 0);
    }

    // remove o like no banco
    return this.tipsService.dislikeTip(+id);
  }

  @UseGuards(AuthGuard)
  @Get('/reset')
  reset() {
    return this.tipsService.reset();
  }

  @UseGuards(AuthGuard)
  @Post('/insert-by-file')
  @UseInterceptors(FileInterceptor('file'))
  insertByFile(@UploadedFile() file) {
    let fileText = file.buffer.toString();
    let fileJson = JSON.parse(fileText);

    try {
      if (undefined != fileJson.tips) {
        fileJson.tips.forEach(tip => {
          this.tipsService.create({
            active: true,
            description: tip.description,
            likes: 0,
            showed_in_date: null
          });
        });
      }

      return true;
    } catch (error) {
      throw new HttpException(
        'Ocorreu algum erro ao incluir as dicas do arquivo.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
