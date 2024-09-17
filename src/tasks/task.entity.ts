import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status";

@Entity()
export class Task{
    @PrimaryGeneratedColumn()
    id?:number;
    @Column()
    name:string;
    @Column()
    description: string;
    @Column()
    status:TaskStatus;

}