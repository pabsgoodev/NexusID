import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from '../entitys/userEntity'
import { Product } from '../entitys/productEntity'

export const AppDataSource = new DataSource({
    type: 'mariadb',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'silvablo',
    database: 'webpage_db',
    synchronize: true,
    logging: false,
    entities: [User, Product],
    migrations: [],
    subscribers: [],
})