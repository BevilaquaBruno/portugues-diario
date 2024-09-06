import { Controller, Get, Res } from "@nestjs/common";
import { returnDbDateFormatted } from "./helper";
import { TipsService } from "./tips/tips.service";
import { Response } from "express";

@Controller()
export class AppController {

  constructor(private readonly tipsService: TipsService) { }

  @Get('/')
  async todayTip(@Res() res: Response) {
    try {
      // Pega a data atual como objeto
      let today = new Date();
      // Converte a data para o formato YYYY-MM-DD
      let todayDate = returnDbDateFormatted(today);
      // Procura no banco de dados uma dica com a data atual preenchida
      let todayTipByDate = await this.tipsService.getTodayTip(todayDate);

      // inicia a variável da dica do dia
      let todayTip;

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

      // Retorna a dica
      return res.render(
        'tip/tip',
        {
          layout: 'layouts/main',
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
    return res.render('login');
  }
}