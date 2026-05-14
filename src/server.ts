import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express'
import helmet from 'helmet';
import cors from 'cors';
import path from 'path'; 
import { corsOptions } from './middlewares/cors';
import { AppDataSource } from './database/connection';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const publicPath = path.join(process.cwd(), 'src', 'public');

app.use(helmet());
app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  try {
    res.sendFile(path.join(publicPath, 'login.html'));
  } catch (error) {
    res.status(500).send("Erro ao carregar o index.html");
  }
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
}

export default app;

AppDataSource.initialize()
    .then(() => {
        console.log("Banco conectado com sucesso");
        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Erro ao conectar no banco:", error);
    });