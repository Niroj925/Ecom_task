import { Injectable } from "@nestjs/common";
import { CreateItemDto } from "./dto/create-item.dto";
import { UpdateItemDto } from "./dto/update-item.dto";
import { itemEntity } from "src/model/sql/item.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(itemEntity)
    private readonly itemRepository: Repository<itemEntity>
  ) {}

  async create(createItemDto: CreateItemDto) {
    const item = this.itemRepository.create({ ...createItemDto });
    await this.itemRepository.save(item);
    return true;
  }

  async findAll() {
    return await this.itemRepository.find();
  }

  async findOne(id: string) {
    return await this.itemRepository.findOne({ where: { id } });
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    const item = await this.itemRepository.findOne({ where: { id } });
    const updatedItem = Object.assign(item, updateItemDto);
    await this.itemRepository.save(updatedItem);
    return true;
  }

  async remove(id: string) {
    await this.itemRepository.delete({ id });
    return true;
  }
}
