import { Router } from 'express';
import path from 'path';

import { UserController } from '../controllers/userController';
import { ProductController } from '../controllers/productController'; 
import { authUser } from '../middlewares/authUsermiddleware';

const router = Router();
const userController = new UserController();
const productController = new ProductController(); 
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

router.get('/auth/me', authUser, userController.me.bind(userController));


router.get('/products', authUser, productController.list.bind(productController));


router.post('/products', authUser, productController.create.bind(productController));


export default router;