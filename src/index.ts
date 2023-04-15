import { MoreThanOrEqual,Like } from "typeorm"
import { AppDataSource } from "./data-source"

import { User } from "./entity/User"
import { Comment } from "./entity/Comment"
import { link } from "fs"

AppDataSource.initialize().then(async () => {

    // console.log("Inserting a new user into the database...")
    // const user = new User()
    // user.firstName = "Timber"
    // user.lastName = "Saw"
    // user.age = 25
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)

    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)

    const users = await AppDataSource.manager.find(User)
    console.log("Loaded all users: ", users)

    const user = await AppDataSource.manager.findOneBy(User, {
        id: 1,
    })
    console.log("Loaded id=1 users: ", user)

    console.log("============ 使用 AppDataSource.getRepository() ========")
    const userRepository = AppDataSource.getRepository(User)

    const newuser = new User()
    newuser.firstName = String(Math.random()).slice(2,5)
    newuser.lastName = String(Math.random()).slice(5,8)
    newuser.age = Math.floor(Math.random() * 100)
    const s = await userRepository.save(newuser)
    console.log("Loaded save user: ", s)


    const users2 = await userRepository.find()
    console.log("Loaded all users2: ", users2)

    const user1 = await userRepository.findOne({
        where:{
            id:1
        }
    })
    console.log(" Loaded user id =1 : ", user1)
    user1.firstName = 'ccc'
    await userRepository.save(user1)
    
    const users3 = await userRepository.find({
        where: {
            age: MoreThanOrEqual(25),
            firstName: Like("%2%")
        },
        order:{
            age:"DESC"
        }
    })
    console.log("Loaded users3 age >= 25 名字带2 : ", users3)

    const users4 = await userRepository.find({
        skip:0,
        take:3
    })
    console.log("分页查询一页3条 Loaded users4 : ", users4)

    
    // ============ 联合查询 ====================
    const commentRepository = AppDataSource.getRepository(Comment)

    const comments1 = await commentRepository.find()
    console.log("纯评论字段列表 comments1 : ", comments1)


   
    const comments2 = await commentRepository.find({
        // select:["id","msg",],
        relations:['user']
    })
    console.log("带有用户信息的评论列表 comments2 : ", comments2)

    const users4c = await userRepository.find({
        relations: ['comments']
    })
    console.log("带有评论的用户列表 : ", users4c)

}).catch(error => console.log(error))
