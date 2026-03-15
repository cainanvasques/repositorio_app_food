import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { UpdateItemDto } from './dto/update-item.dto';


@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly repository: Repository<Item>,
  ) { }


  findAll() {
    return this.repository.find();
  }

  async create(name: string, quantity: number) {
    const newItem = this.repository.create({
      name,
      quantity,
      isPurchased: false,
    });

    return await this.repository.save(newItem);
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

    await this.repository.save(item);

    return {
      message: `O item ${item.name} foi editado com sucesso`,
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
}
