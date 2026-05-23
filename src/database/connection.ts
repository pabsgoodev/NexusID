// import 'reflect-metadata'
// import { DataSource } from 'typeorm'
// import { User } from '../entitys/userEntity'
// import { Product } from '../entitys/productEntity'

// export const AppDataSource = new DataSource({
//     type: 'mariadb',
//     host: 'localhost',
//     port: 3306,
//     username: 'root',
//     password: 'silvablo',
//     database: 'webpage_db',
//     synchronize: true,
//     logging: false,
//     entities: [User, Product],
//     migrations: [],
//     subscribers: [],
// })

import { DataSource } from "typeorm";
import { User } from "../entitys/userEntity";
import { Product } from "../entitys/productEntity";
// Importe suas entidades aqui (User, Product, etc)

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false 
    },
    synchronize: true, 
    logging: false,
    entities: [User, Product],
});