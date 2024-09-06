import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('usuarios')
export class UsuariosController {

  @Get('cadastro')
  form(@Res() res: Response) {
    return res.render(
      'user/form',
      { layout: 'layouts/admin' }
    );
  }

  @Get()
  list(@Res() res: Response) {
    return res.render(
      'user/list',
      { layout: 'layouts/admin' }
    );
  }
}
