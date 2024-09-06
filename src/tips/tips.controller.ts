import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards, Render } from '@nestjs/common';
import { TipsService } from './tips.service';
import { CreateTipDto } from './dto/create-tip.dto';
import { UpdateTipDto } from './dto/update-tip.dto';
import { returnDbDateFormatted } from 'src/helper';
import { AuthGuard } from 'src/auth/auth.guard';

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

  @Get('/today')
  @Render('index')
  async today() {
    try {
      // Pega a data atual como objeto
      let today = new Date();
      // Converte a data para o formato YYYY-MM-DD
      let todayDate = returnDbDateFormatted(today);
      // Procura no banco de dados uma dica com a data atual preenchida
      let todayTipByDate = await this.tipsService.getTodayTip(todayDate);

      // Se existir uma dica com essa data retorna ela
      if (todayTipByDate != null)
        return todayTipByDate;

      // Se não existir uma dica com essa data, procura no banco a primeira que não tem data
      let tipWithoutDate = await this.tipsService.getFirstTipWithoutDate();
      // Converte essa dica na dica do dia
      let todayTip = tipWithoutDate;
      // Seta a data da dica para a data atual criada antes
      todayTip.showed_in_date = today;

      // Atualiza a data da dica de hoje no banco de dados
      await this.tipsService.update(todayTip.id, todayTip);

      // Retorna a dica
      return todayTip;
    } catch (error) {
      // deu alguma merda
      throw new HttpException(
        'Aconteceu um problema ao buscar a dica do dia.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
