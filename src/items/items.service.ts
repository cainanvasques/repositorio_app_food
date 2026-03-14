import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';


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
}
