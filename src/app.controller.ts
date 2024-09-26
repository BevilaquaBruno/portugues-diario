import { Controller, Get, Inject, Res } from "@nestjs/common";
import { returnDbDateFormatted } from "./helper";
import { TipsService } from "./tips/tips.service";
import { Response } from "express";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from 'cache-manager';

@Controller()
export class AppController {

  constructor(private readonly tipsService: TipsService, @Inject(CACHE_MANAGER) private cacheManager: Cache) { }

    /*
    @Get('/changeCacheDate')
    async changeCacheDate(){
      let todayTip;
      todayTip = await this.cacheManager.get('todayTip');

      todayTip.showed_in_date = '2024-09-27';

      await this.cacheManager.set('todayTip', todayTip, 0);

    }
    */


  @Get('/')
  async todayTip(@Res() res: Response) {
    try {

      let todayTip;
      //pega a dica do cache atual
      todayTip = await this.cacheManager.get('todayTip');
  
      //se não existir a dica no cache, pega uma do banco
      if (undefined == todayTip)
        todayTip = await this.returnTodayTip();
  
  
      // pega as duas datas no formato YYYY-MM-DD
      let todayDate = returnDbDateFormatted(new Date());
      let tipDate = returnDbDateFormatted(new Date(todayTip.showed_in_date));
  
      // se a data de hoje for diferente da data da dica, pega do banco
      if(todayDate != tipDate)
        todayTip = await this.returnTodayTip();

      // Retorna a dica
      return res.render(
        'tip/tip',
        {
          layout: 'layouts/main-layout',
          ...todayTip
        }
      );
    } catch (error) {
      // deu alguma merda
      return res.render('errors/500');
    }
  }

  @Get('login')
  login(@Res() res: Response) {
    return res.render('login', { layout: 'layouts/login-layout' });
  }


  private async returnTodayTip() {
    //cria a variavel para a dica
    let todayTip;
    // Pega a data atual como objeto
    let today = new Date();
    // Converte a data para o formato YYYY-MM-DD
    let todayDate = returnDbDateFormatted(today);
    // Procura no banco de dados uma dica com a data atual preenchida
    let todayTipByDate = await this.tipsService.getTodayTip(todayDate);

    // Se existir uma dica com essa data retorna ela
    if (todayTipByDate != null) {
      // define a dica com a da data atual
      todayTip = todayTipByDate;
    } else {
      // Se não existir uma dica com essa data, procura no banco a primeira que não tem data
      let tipWithoutDate = await this.tipsService.getFirstTipWithoutDate();

      // Converte a dica consultada agora na dica do dia
      todayTip = tipWithoutDate;
      // Seta a data da dica para a data atual criada antes
      todayTip.showed_in_date = today;

      // Atualiza a data da dica de hoje no banco de dados
      await this.tipsService.update(todayTip.id, todayTip);
    }

    await this.cacheManager.set('todayTip', todayTip, 0);
    return todayTip;
  }
}