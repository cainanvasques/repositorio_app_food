import { Injectable, NotFoundException } from '@nestjs/common';
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

    Object.assign(item, updateItemDto);

    return await this.repository.save(item);
  }
}
