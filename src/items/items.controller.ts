import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateItemDto } from './dto/update-item.dto';

@ApiTags('Controle de Dieta - Itens')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) { }

  @Post()
  @ApiOperation({ summary: 'Cadastra um novo item', description: 'Permite cadastrar um novo item.'})
  create(@Body() CreateItemDto: CreateItemDto) {

    return this.itemsService.create(CreateItemDto.name, CreateItemDto.quantity);
  }

  @Get()
  @ApiOperation({ summary: 'Busca todos os itens', description: 'Permite trazer a lista com todos os itens cadastrados.'})
  @ApiResponse({
    status: 200,
    description: 'Retorna a lista completa de alimentos.',
    type: [CreateItemDto]
  })
  findAll() {
    return this.itemsService.findAll();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um item', description: 'Permite alterar o nome, quantidade ou status de comprado de um item já cadastrado.' })
  @ApiParam({ name: 'id', description: 'O ID numérico do item que você quer editar', example: '1' })
  update(
    @Param('id') id: string,
    @Body() UpdateItemDto: UpdateItemDto
  ){
    return this.itemsService.update(+id, UpdateItemDto)
  }
}
