import { Column, Entity, ManyToMany } from "typeorm";
import { parentEntity } from ".";
import { packageEntity } from "./package.entity";

@Entity('item')
export class itemEntity extends parentEntity {
    @Column()
    name:string;

    @Column()
    price:number;

    @Column() 
    weight:number;

    @ManyToMany(()=>packageEntity,(pkg)=>pkg.items)
    package:itemEntity[]
}