import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';

@Controller('usuarios')
export class UsuariosController {

  constructor(private readonly userService: UserService) { }

  @Get('cadastrar')
  create(@Res() res: Response) {
    return res.render(
      'user/form',
      {
        layout: 'layouts/admin-layout',
        new: true,
        user: {
          id: 0,
          name: '',
          email: '',
        }
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
  async edit(@Res() res: Response, @Param('id') id: string) {
    let user = await this.userService.findOne(+id);
    user.password = '';

    return res.render(
      'user/form',
      {
        layout: 'layouts/admin-layout',
        new: false,
        user: user
      }
    );
  }
}
