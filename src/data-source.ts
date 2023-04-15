import "reflect-metadata"
import { DataSource } from "typeorm"
import path = require("path")

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "scc",
    password: "123456",
    database: "sccdev",
    synchronize: true,
    logging: false,
    entities: [path.resolve(__dirname, './entity/*.ts') ],
    migrations: [],
    subscribers: [],
})
