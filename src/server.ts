import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';

import { corsOptions } from './middlewares/cors';
import { AppDataSource } from './database/connection';

import router from './routes/routes';

dotenv.config();

const app = express();
app.use(cors(corsOptions))

const PORT = process.env.PORT || 3000;

app.use(helmet());

if (process.env.NODE_ENV === 'production') {
    console.log('Modo produção');
}

app.use(express.json());
app.use(cookieParser());

app.use(
    express.static(
        path.join(process.cwd(), 'src', 'public')
    )
);

app.use('/', router);

router.get('/', (req, res) => {
    res.redirect('/login');
});

AppDataSource.initialize()
    .then(() => {

        console.log('Banco conectado');

        app.listen(PORT, () => {

            console.log(
                `Servidor rodando na porta ${PORT}`
            );
        });

    })
    .catch((error) => {

        console.error(error);
    });