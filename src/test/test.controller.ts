import { Controller, Get } from '@nestjs/common';

@Controller('test')
export class TestController {
  @Get()
  test() {
    return {
      status: 'ok',
      message: 'Test successful!',
    };
  }
}
