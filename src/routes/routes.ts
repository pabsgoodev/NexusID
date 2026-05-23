import { Router } from 'express';
import path from 'path';

import { UserController } from '../controllers/userController';
// import { ProductController } from '../controllers/productController'; // Certifique-se de ter este controller
import { authUser } from '../middlewares/authUsermiddleware';

const router = Router();
const userController = new UserController();
// const productController = new ProductController(); // Instanciando o controller de produtos

const publicPath = path.join(process.cwd(), 'src', 'public', 'pages');

// --- ROTAS DE PÁGINAS (FRONT-END) ---
router.get('/login', (req, res) => {
    res.sendFile(path.join(publicPath, 'login.html'));
});

router.get('/register', (req, res) => {
    res.sendFile(path.join(publicPath, 'register.html'));
});

// O middleware authUser protege a página. Se não estiver logado, nem carrega o HTML.
router.get('/dashboard', authUser, (req, res) => {
    res.sendFile(path.join(publicPath, 'dashboard.html'));
});


// --- ROTAS de API (BACK-END) ---

// Autenticação e Usuário
router.post('/auth/login', userController.login.bind(userController));
router.post('/auth/register', userController.register.bind(userController));

// Rota crucial para preencher o "Nome do Usuário" no Dashboard
router.get('/auth/me', authUser, userController.me.bind(userController));

// Rota de Produtos (O que faltava para preencher o Grid)
// O JavaScript do front vai dar fetch em '/products'
// router.get('/products', authUser, productController.list.bind(productController));

// Exemplo de rota para criar produto (POST)
// router.post('/products', authUser, productController.create.bind(productController));


export default router;