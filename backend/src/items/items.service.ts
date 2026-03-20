import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { UpdateItemDto } from './dto/update-item.dto';


@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly repository: Repository<Item>,
  ) { }

  async findAll() {
    return this.repository.find();
  }

  async create(createItemDto: CreateItemDto) {
    const newItem = this.repository.create({
      ...createItemDto,
      name: createItemDto.name.trim(),
      isPurchased: false,
    });

    const register = await this.repository.save(newItem);

    return {
      success: true,
      message: "Item adicionado à lista!",
      data: register
    };

  }

  async update(id: number, updateItemDto: UpdateItemDto) {

    const item = await this.repository.findOneBy({ id });

    if (!item) {
      throw new NotFoundException(`Item com ID ${id} não localizado`);
    }

    const hasChanges = Object.keys(updateItemDto).some(
      (key) => updateItemDto[key] !== item[key]
    );

    if (!hasChanges) {
      throw new BadRequestException('Nenhuma alteração foi detectada para este item.');
    }

    Object.assign(item, updateItemDto);
    const updatedItem = await this.repository.save(item);

    return {
      success: true,
      message: `O item ${item.name} foi editado com sucesso`,
      data: updatedItem
    }
  }

  async remove(id: number) {
    const item = await this.repository.findOneBy({ id });

    if (!item) {
      throw new NotFoundException(`Item com ID ${id} não localizado`);
    }

    await this.repository.remove(item);

    return {
      message: `O item ${item.name} foi deletado com sucesso`,
    }
  }

  async findItemName(name: string) {
    const search = await this.repository.findOne({
      where: { name: ILike(name.trim()) }
    });

    return search?.name
  }
}
