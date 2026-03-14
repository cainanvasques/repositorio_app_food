import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) { }

  @Post()
  create(@Body() CreateItemDto: CreateItemDto) {

    return this.itemsService.create(CreateItemDto.name, CreateItemDto.quantity);
  }

  @Get()
  @ApiOperation({ summary: 'Busca todos os itens' })
  @ApiResponse({
    status: 200,
    description: 'Retorna a lista completa de alimentos.',
    type: [CreateItemDto]
  })
  findAll() {
    return this.itemsService.findAll();
  }
}
