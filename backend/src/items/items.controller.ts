import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, ParseIntPipe } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateItemDto } from './dto/update-item.dto';

@ApiTags('Controle de Dieta - Itens')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) { }

  @Get()
  @ApiOperation({ summary: 'Busca todos os itens', description: 'Permite trazer a lista com todos os itens cadastrados.' })
  @ApiResponse({
    status: 200,
    description: 'Retorna a lista completa de alimentos.',
    type: [CreateItemDto]
  })
  findAll() {
    return this.itemsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Cadastra um novo item', description: 'Permite cadastrar um novo item.' })
  async create(@Body() CreateItemDto: CreateItemDto) {

    const itemExists = await this.itemsService.findItemName(CreateItemDto.name);

    if (itemExists) {
      throw new ConflictException('Já existe um item com esse nome')
    }

    return this.itemsService.create(CreateItemDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um item', description: 'Permite alterar o nome, quantidade ou status de comprado de um item já cadastrado.' })
  @ApiParam({ name: 'id', description: 'O ID numérico do item que você quer editar', example: '1' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateItemDto: UpdateItemDto
  ) {
    return this.itemsService.update(id, UpdateItemDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um item', description: 'Permite remover um item já cadastrado.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.remove(id)
  }
}
