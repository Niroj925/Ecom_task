import { parentEntity } from ".";
export declare class itemEntity extends parentEntity {
    name: string;
    price: number;
    weight: number;
    package: itemEntity[];
}
