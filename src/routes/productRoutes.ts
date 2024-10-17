import express from 'express';
import { ProductController } from '../controllers/productController';

const router = express.Router();

router.get('/', ProductController.getProducts);

export default router;
