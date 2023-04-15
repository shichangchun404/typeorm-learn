import { Entity, PrimaryGeneratedColumn, Column,JoinColumn,ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    msg:string;

    @ManyToOne(type => User)
    @JoinColumn()
    user: User

}