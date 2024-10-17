import express from 'express';
import { Middleware } from '../middleware/auth';
import { CartController } from '../controllers/cartController';


const router = express.Router();

router.get('/', Middleware.authenticate, CartController.getCart);
router.post('/update', Middleware.authenticate, CartController.updateItem);
router.post('/remove', Middleware.authenticate, CartController.removeItem);
router.post('/clear', Middleware.authenticate, CartController.clearCart);
router.post('/add', Middleware.authenticate, CartController.addItem);

export default router;
