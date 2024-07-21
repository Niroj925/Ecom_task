
import { CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export class parentEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string;
    
    @CreateDateColumn()
    createdAt:Date;
}