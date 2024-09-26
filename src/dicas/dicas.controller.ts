import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('dicas')
export class DicasController {

  @Get('cadastrar')
  form(@Res() res: Response) {
    return res.render(
      'tip/form',
      { layout: 'layouts/admin-layout' }
    );
  }

  @Get()
  list(@Res() res: Response) {
    return res.render(
      'tip/list',
      { layout: 'layouts/admin-layout' }
    );
  }
}