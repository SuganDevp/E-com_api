
import { Request, Response } from 'express';
import { CartService } from '../services/cartService';

export class CartController {

    static async getCart(req: Request, res: Response) {
        try {
            const userId = req.user?.id;

            if (!userId) {
                res.status(401).json({ message: 'User not authenticated' });
                return
            }

            const cart = await CartService.getOrCreateCart(userId);
            res.status(200).json(cart);
        } catch (error) {
            console.error('Error fetching cart:', error);
            res.status(500).json({ message: 'Failed to fetch cart', error });
        }
    }

    static async addItem(req: Request, res: Response) {
        try {
            const userId = req.user?.id;
            const { productId, quantity } = req.body;

            if (!userId) {
                res.status(401).json({ message: 'User not authenticated' });
                return
            }

            if (!productId || typeof quantity !== 'number') {
                res.status(400).json({ message: 'Product ID and quantity are required' });
                return
            }

            const updatedCart = await CartService.addItemToCart(userId, productId, quantity);
            res.status(200).json(updatedCart);
        } catch (error) {
            console.error('Error adding item to cart:', error);
            res.status(500).json({ message: 'Failed to add item to cart', error });
        }
    }

    static async updateItem(req: Request, res: Response) {
        try {
            const userId = req.user?.id;
            const { productId, quantity } = req.body;

            if (!userId) {
                res.status(401).json({ message: 'User not authenticated' });
                return
            }

            if (!productId || typeof quantity !== 'number') {
                res.status(400).json({ message: 'Product ID and quantity are required' });
                return
            }

            const updatedCart = await CartService.updateCartItem(userId, productId, quantity);
            res.status(200).json(updatedCart);
        } catch (error) {
            console.error('Error updating cart item:', error);
            res.status(500).json({ message: 'Failed to update cart item', error });
        }
    }

    static async removeItem(req: Request, res: Response) {
        try {
            const userId = req.user?.id;
            const { productId } = req.body;

            if (!userId) {
                res.status(401).json({ message: 'User not authenticated' });
                return
            }

            if (!productId) {
                res.status(400).json({ message: 'Product ID is required' });
                return
            }

            const updatedCart = await CartService.removeItemFromCart(userId, productId);
            res.status(200).json(updatedCart);
        } catch (error) {
            console.error('Error removing item from cart:', error);
            res.status(500).json({ message: 'Failed to remove item from cart', error });
        }
    }

    static async clearCart(req: Request, res: Response) {
        try {
            const userId = req.user?.id;

            if (!userId) {
                res.status(401).json({ message: 'User not authenticated' });
                return
            }

            const updatedCart = await CartService.clearCart(userId);
            res.status(200).json(updatedCart);
        } catch (error) {
            console.error('Error clearing cart:', error);
            res.status(500).json({ message: 'Failed to clear cart', error });
        }
    }

    static async syncCart(req: Request, res: Response) {
        try {
            const userId = req.user?.id;
            const { localCart } = req.body;

            if (!userId) {
                res.status(401).json({ message: 'User not authenticated' });
                return
            }

            const updatedCart = await CartService.syncCart(userId, localCart);
            res.status(200).json(updatedCart);
        } catch (error) {
            console.error('Error syncing cart:', error);
            return res.status(500).json({ message: 'Failed to sync cart', error });
        }
    }
}
