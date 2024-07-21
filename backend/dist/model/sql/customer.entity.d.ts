import { parentEntity } from ".";
import { packageEntity } from "./package.entity";
export declare class customerEntity extends parentEntity {
    email: string;
    password: string;
    package: packageEntity[];
}
