import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class AppController {
  @Get()
  index() {
    return '<h1 style="text-align: center;margin-top: 250px">Nest Js App</h1>';
  }
}
