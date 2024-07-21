import { ForbiddenException, Injectable } from "@nestjs/common";
import { CreatePackageDto } from "./dto/create-package.dto";
import { UpdatePackageDto } from "./dto/update-package.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { packageEntity } from "src/model/sql/package.entity";
import { Repository } from "typeorm";
import { itemEntity } from "src/model/sql/item.entity";
import { packageStatus } from "src/helper/types/types";

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(packageEntity)
    private readonly packageRepository: Repository<packageEntity>,

    @InjectRepository(itemEntity)
    private readonly itemRepository: Repository<itemEntity>
  ) {}

  async create(createPackageDto: CreatePackageDto,id:string) {
    let totalCost = 0;
    let weight = 0;
    const items = createPackageDto.items.map(async (id) => {
      const item = await this.itemRepository.findOne({ where: { id } });
      totalCost += +item.price; //type conversion string to int
      weight += +item.weight;
      if (totalCost <= 250) {
        return item;
      } else {
        throw new ForbiddenException("total amount should be less than $250.");
      }
    });
    const itemsAll = await Promise.all(items);
    const newPackage = this.packageRepository.create({
      weight,
      price: totalCost,
      courierPrice:courierPrice(weight),
      status: packageStatus.pending,
      items: itemsAll,
      customer:{id}
    });
    await this.packageRepository.save(newPackage);
    return true;
  }

  async findAll(package_status:packageStatus) {
    const packages=await this.packageRepository.find({
      where:{status:package_status},
      relations:['customer'],
      select:{
        id:true,
        price:true,
        courierPrice:true,
        weight:true,
        customerEmail:true
        // customer:{email:true}
      }
    })
    return packages;
  }

 async findOne(id: string) {
    const my_package=await this.packageRepository.findOne({
      where:{id},
      relations:['items','customer'],
      select:{
        items:true,
        customerEmail:true
        // customer:{
        //   email:true
        // }
      }
    })
    return my_package;
  }

  update(id: number, updatePackageDto: UpdatePackageDto) {
    return `This action updates a #${id} package`;
  }

  async remove(id: string) {
    const my_package = await this.packageRepository.findOne({ where: { id } });
    if (my_package.status == packageStatus.pending) {
      await this.packageRepository.remove(my_package);
      return true;
    } else {
      return {
        success: false,
        msg: "not possible delete package you can return",
      };
    }
  }
}

const courierPrice = (weight: number) => {
  let price: number;
  if (weight < 200) {
    price = 5;
  } else if (weight < 500) {
    price = 10;
  } else if (weight < 1000) {
    price = 15;
  } else if (weight < 5000) {
    price = 20;
  } else {
    price = 25;
  }
  return price;
};
