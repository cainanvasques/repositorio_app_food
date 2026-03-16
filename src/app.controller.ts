import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { AppService } from './app.service';
import { UpdateItemDto } from './items/dto/update-item.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

}
