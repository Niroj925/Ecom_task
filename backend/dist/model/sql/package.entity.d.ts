import { parentEntity } from ".";
import { itemEntity } from "./item.entity";
import { customerEntity } from "./customer.entity";
import { packageStatus } from "src/helper/types/types";
export declare class packageEntity extends parentEntity {
    weight: number;
    price: number;
    courierPrice: number;
    status: packageStatus;
    customerEmail: string;
    items: itemEntity[];
    customer: customerEntity;
}
