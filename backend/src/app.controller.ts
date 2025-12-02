import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('hello')
  async getHello(): Promise<any> {
    return await this.appService.getHello();
  }

  @Get('test')
  async test(): Promise<any> {
    return this.appService.test();
  }

  @Post('test-sendmail')
  async test_email() {
    return await this.appService.test_sendMail();
  }
}
