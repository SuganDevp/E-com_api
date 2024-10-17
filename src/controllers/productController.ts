import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const productsFilePath = path.join(__dirname, '../../data/products.json');;

export const loadProducts = (): any[] => {
    try {
        const data = fs.readFileSync(productsFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.log('%csrc/controllers/productController.ts:13 error', 'color: #007acc;', error);
    }
    return []
};

export class ProductController {
    static async getProducts(req: Request, res: Response) {
        const products = loadProducts();

        res.json(products);
    };
}


