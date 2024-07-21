import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { packageStatus } from 'src/helper/types/types';
export declare class PackageController {
    private readonly packageService;
    constructor(packageService: PackageService);
    create(customerId: string, createPackageDto: CreatePackageDto): Promise<boolean>;
    findAll(query: {
        package_status: packageStatus;
    }): Promise<import("../../model/sql/package.entity").packageEntity[]>;
    findOne(id: string): Promise<import("../../model/sql/package.entity").packageEntity>;
    update(id: string, updatePackageDto: UpdatePackageDto): string;
    remove(id: string): Promise<true | {
        success: boolean;
        msg: string;
    }>;
}
