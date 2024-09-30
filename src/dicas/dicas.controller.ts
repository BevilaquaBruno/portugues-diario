import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { TipsService } from 'src/tips/tips.service';

@Controller('dicas')
export class DicasController {

  constructor(private readonly tipService: TipsService) { }

  @Get('cadastrar')
  create(@Res() res: Response) {
    return res.render(
      'tip/form',
      {
        layout: 'layouts/admin-layout',
        new: true,
        tip: {
          id: 0,
          description: '',
          likes: 0,
          active: true
        }
      }
    );
  }

  @Get()
  list(@Res() res: Response) {
    return res.render(
      'tip/list',
      { layout: 'layouts/admin-layout' }
    );
  }

  @Get('/editar/:id')
  async edit(@Res() res: Response, @Param('id') id: string) {
    let tip = await this.tipService.findOne(+id);

    return res.render(
      'tip/form',
      {
        layout: 'layouts/admin-layout',
        new: false,
        tip: tip
      }
    );
  }
}
