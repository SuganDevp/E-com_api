import { Types } from "mongoose";
import { Cart, CartModel, CartItem } from "../models/Cart";



export class CartService {
    // Get or create a cart for the user
    static async getOrCreateCart(userId: string): Promise<Cart> {
        let cart = await CartModel.findOne({ userId });

        if (!cart) {
            cart = new CartModel({
                userId,
                items: [],
            });
            await cart.save();
        }

        return cart;
    }

    // Add item to the cart
    static async addItemToCart(userId: string, hsnCode: string, quantity: number) {
        try {
            const userObjectId = new Types.ObjectId(userId);

            let cart = await CartModel.findOne({ userId: userObjectId });

            if (!cart) {
                cart = new CartModel({ userId: userObjectId, items: [] });
            }

            const existingItem = cart.items.find(item => item.productId === hsnCode);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({ productId: hsnCode, quantity });
            }

            await cart.save();

            return cart;
        } catch (error) {
            console.error('Error adding item to cart:', error);
            throw new Error('Failed to add item to cart.');
        }
    }

    // Update cart item
    static async updateCartItem(userId: string, productId: string, quantity: number): Promise<Cart> {
        const cart = await this.getOrCreateCart(userId);

        const item = cart.items.find(item => item.productId.toString() === productId);
        if (item) {
            item.quantity = quantity;
            await cart.save();
        }

        return cart;
    }

    // Remove item from cart
    static async removeItemFromCart(userId: string, productId: string): Promise<Cart> {
        const cart = await this.getOrCreateCart(userId);

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save();

        return cart;
    }

    // Clear cart
    static async clearCart(userId: string): Promise<Cart> {
        const cart = await this.getOrCreateCart(userId);

        cart.items = [];
        await cart.save();

        return cart;
    }

    static async syncCart(userId: string, cartItems: { hsnCode: string; quantity: number }[]) {
        try {
            const userObjectId = new Types.ObjectId(userId);

            let cart = await CartModel.findOne({ userId: userObjectId });

            if (!cart) {
                cart = new CartModel({ userId: userObjectId, items: [] });
            }

            cartItems.forEach(item => {
                const existingItem = cart.items.find(i => i.productId === item.hsnCode);
                if (existingItem) {
                    existingItem.quantity += item.quantity;
                } else {
                    cart.items.push({ productId: item.hsnCode, quantity: item.quantity });
                }
            });

            await cart.save();

            return cart;
        } catch (error) {
            console.error('Error syncing cart:', error);
            throw new Error('Failed to sync cart.');
        }
    }
}

