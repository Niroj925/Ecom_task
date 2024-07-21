import { CreatePackageDto } from "./dto/create-package.dto";
import { UpdatePackageDto } from "./dto/update-package.dto";
import { packageEntity } from "src/model/sql/package.entity";
import { Repository } from "typeorm";
import { itemEntity } from "src/model/sql/item.entity";
import { packageStatus } from "src/helper/types/types";
export declare class PackageService {
    private readonly packageRepository;
    private readonly itemRepository;
    constructor(packageRepository: Repository<packageEntity>, itemRepository: Repository<itemEntity>);
    create(createPackageDto: CreatePackageDto, id: string): Promise<boolean>;
    findAll(package_status: packageStatus): Promise<packageEntity[]>;
    findOne(id: string): Promise<packageEntity>;
    update(id: number, updatePackageDto: UpdatePackageDto): string;
    remove(id: string): Promise<true | {
        success: boolean;
        msg: string;
    }>;
}
