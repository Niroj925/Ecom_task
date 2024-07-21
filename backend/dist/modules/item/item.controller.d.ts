import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
export declare class ItemController {
    private readonly itemService;
    constructor(itemService: ItemService);
    create(createItemDto: CreateItemDto): Promise<boolean>;
    findAll(): Promise<import("../../model/sql/item.entity").itemEntity[]>;
    findOne(id: string): Promise<import("../../model/sql/item.entity").itemEntity>;
    update(id: string, updateItemDto: UpdateItemDto): Promise<boolean>;
    remove(id: string): Promise<boolean>;
}
