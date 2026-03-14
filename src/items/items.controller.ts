import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) { }

  @Post()
  create(@Body() CreateItemDto: CreateItemDto) {

    return this.itemsService.create(CreateItemDto.name, CreateItemDto.quantity);
  }

  @Get()
  findAll() {
    return this.itemsService.findAll();
  }
}
