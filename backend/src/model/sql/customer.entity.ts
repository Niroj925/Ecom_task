import { Column, Entity, OneToMany } from "typeorm";
import { parentEntity } from ".";
import { packageEntity } from "./package.entity";

@Entity('customer')
export class customerEntity extends parentEntity{
    @Column({unique:true})
    email:string;

    @Column({default:null,nullable:true})
    password:string;

    @OneToMany(()=>packageEntity,(item)=>item.customer,{onDelete:'CASCADE'})
    package:packageEntity[];
}