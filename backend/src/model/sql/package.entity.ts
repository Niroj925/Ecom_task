import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { parentEntity } from ".";
import { itemEntity } from "./item.entity";
import { customerEntity } from "./customer.entity";
import { packageStatus } from "src/helper/types/types";
import { IsEmail } from "class-validator";


@Entity('package')
export class packageEntity extends parentEntity{

    @Column()
    weight:number;

    @Column()
    price:number;

    @Column({default:0})
    courierPrice:number

    @Column()
    status:packageStatus;

    @IsEmail()
    customerEmail:string;

    @ManyToMany(()=>itemEntity,(item)=>item.package,{onDelete:'CASCADE'})
    @JoinTable({name:'packageItemId'})
    items:itemEntity[]


    @ManyToOne(()=>customerEntity,(customer)=>customer.package)
    customer:customerEntity;
}