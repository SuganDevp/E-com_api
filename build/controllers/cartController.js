"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const cartService_1 = require("../services/cartService");
class CartController {
    static getCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    res.status(401).json({ message: 'User not authenticated' });
                    return;
                }
                const cart = yield cartService_1.CartService.getOrCreateCart(userId);
                res.status(200).json(cart);
            }
            catch (error) {
                console.error('Error fetching cart:', error);
                res.status(500).json({ message: 'Failed to fetch cart', error });
            }
        });
    }
    static addItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const { productId, quantity } = req.body;
                if (!userId) {
                    res.status(401).json({ message: 'User not authenticated' });
                    return;
                }
                if (!productId || typeof quantity !== 'number') {
                    res.status(400).json({ message: 'Product ID and quantity are required' });
                    return;
                }
                const updatedCart = yield cartService_1.CartService.addItemToCart(userId, productId, quantity);
                res.status(200).json(updatedCart);
            }
            catch (error) {
                console.error('Error adding item to cart:', error);
                res.status(500).json({ message: 'Failed to add item to cart', error });
            }
        });
    }
    static updateItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const { productId, quantity } = req.body;
                if (!userId) {
                    res.status(401).json({ message: 'User not authenticated' });
                    return;
                }
                if (!productId || typeof quantity !== 'number') {
                    res.status(400).json({ message: 'Product ID and quantity are required' });
                    return;
                }
                const updatedCart = yield cartService_1.CartService.updateCartItem(userId, productId, quantity);
                res.status(200).json(updatedCart);
            }
            catch (error) {
                console.error('Error updating cart item:', error);
                res.status(500).json({ message: 'Failed to update cart item', error });
            }
        });
    }
    static removeItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const { productId } = req.body;
                if (!userId) {
                    res.status(401).json({ message: 'User not authenticated' });
                    return;
                }
                if (!productId) {
                    res.status(400).json({ message: 'Product ID is required' });
                    return;
                }
                const updatedCart = yield cartService_1.CartService.removeItemFromCart(userId, productId);
                res.status(200).json(updatedCart);
            }
            catch (error) {
                console.error('Error removing item from cart:', error);
                res.status(500).json({ message: 'Failed to remove item from cart', error });
            }
        });
    }
    static clearCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    res.status(401).json({ message: 'User not authenticated' });
                    return;
                }
                const updatedCart = yield cartService_1.CartService.clearCart(userId);
                res.status(200).json(updatedCart);
            }
            catch (error) {
                console.error('Error clearing cart:', error);
                res.status(500).json({ message: 'Failed to clear cart', error });
            }
        });
    }
    static syncCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const { localCart } = req.body;
                if (!userId) {
                    res.status(401).json({ message: 'User not authenticated' });
                    return;
                }
                const updatedCart = yield cartService_1.CartService.syncCart(userId, localCart);
                res.status(200).json(updatedCart);
            }
            catch (error) {
                console.error('Error syncing cart:', error);
                return res.status(500).json({ message: 'Failed to sync cart', error });
            }
        });
    }
}
exports.CartController = CartController;
