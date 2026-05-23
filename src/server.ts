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

// Middlewares
app.use(cors(corsOptions));
app.use(helmet({
    contentSecurityPolicy: false, 
}));
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

router.get('/', (req, res) => {
    res.redirect('/login');
});

const startServer = async () => {
    if (!AppDataSource.isInitialized) {
        try {
            await AppDataSource.initialize();
            console.log('Banco conectado com sucesso');
        } catch (error) {
            console.error('Erro ao conectar no banco:', error);
        }
    }
};

startServer();


if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor local rodando na porta ${PORT}`);
    });
}

export default app;