import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('usuarios')
export class UsuariosController {

  @Get('cadastrar')
  create(@Res() res: Response) {
    return res.render(
      'user/form',
      {
        layout: 'layouts/admin-layout',
        id: 0
      }
    );
  }

  @Get()
  list(@Res() res: Response) {
    return res.render(
      'user/list',
      { layout: 'layouts/admin-layout' }
    );
  }

  @Get('/editar/:id')
  edit(@Res() res: Response, @Param('id') id: string) {
    return res.render(
      'user/form',
      {
        layout: 'layouts/admin-layout',
        id: id
      }
    );
  }
}
