import { CreateItemDto } from "./dto/create-item.dto";
import { UpdateItemDto } from "./dto/update-item.dto";
import { itemEntity } from "src/model/sql/item.entity";
import { Repository } from "typeorm";
export declare class ItemService {
    private readonly itemRepository;
    constructor(itemRepository: Repository<itemEntity>);
    create(createItemDto: CreateItemDto): Promise<boolean>;
    findAll(): Promise<itemEntity[]>;
    findOne(id: string): Promise<itemEntity>;
    update(id: string, updateItemDto: UpdateItemDto): Promise<boolean>;
    remove(id: string): Promise<boolean>;
}
