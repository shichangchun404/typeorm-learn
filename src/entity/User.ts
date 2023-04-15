import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany} from "typeorm"
import { Comment } from "./Comment"
import { type } from "os"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @OneToMany(type=>Comment, Comment=>Comment.user)
    comments:Comment[]
}
