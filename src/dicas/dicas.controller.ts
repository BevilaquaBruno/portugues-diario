import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('dicas')
export class DicasController {

  @Get('cadastro')
  form(@Res() res: Response) {
    return res.render(
      'tip/form',
      { layout: 'layouts/admin' }
    );
  }

  @Get()
  list(@Res() res: Response) {
    return res.render(
      'tip/list',
      { layout: 'layouts/admin' }
    );
  }
}
