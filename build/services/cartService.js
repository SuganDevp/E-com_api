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
exports.CartService = void 0;
const mongoose_1 = require("mongoose");
const Cart_1 = require("../models/Cart");
class CartService {
    // Get or create a cart for the user
    static getOrCreateCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let cart = yield Cart_1.CartModel.findOne({ userId });
            if (!cart) {
                cart = new Cart_1.CartModel({
                    userId,
                    items: [],
                });
                yield cart.save();
            }
            return cart;
        });
    }
    // Add item to the cart
    static addItemToCart(userId, hsnCode, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Ensure userId is a valid ObjectId
                const userObjectId = new mongoose_1.Types.ObjectId(userId);
                // Find the user's cart
                let cart = yield Cart_1.CartModel.findOne({ userId: userObjectId });
                // If cart does not exist, create a new one
                if (!cart) {
                    cart = new Cart_1.CartModel({ userId: userObjectId, items: [] });
                }
                // Check if the item already exists in the cart
                const existingItem = cart.items.find(item => item.productId === hsnCode);
                if (existingItem) {
                    existingItem.quantity += quantity; // Update quantity
                }
                else {
                    cart.items.push({ productId: hsnCode, quantity }); // Add new item
                }
                // Save the cart to the database
                yield cart.save();
                return cart; // Returning the updated cart
            }
            catch (error) {
                console.error('Error adding item to cart:', error);
                throw new Error('Failed to add item to cart.');
            }
        });
    }
    // Update cart item
    static updateCartItem(userId, productId, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.getOrCreateCart(userId);
            const item = cart.items.find(item => item.productId.toString() === productId);
            if (item) {
                item.quantity = quantity;
                yield cart.save();
            }
            return cart;
        });
    }
    // Remove item from cart
    static removeItemFromCart(userId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.getOrCreateCart(userId);
            cart.items = cart.items.filter(item => item.productId.toString() !== productId);
            yield cart.save();
            return cart;
        });
    }
    // Clear cart
    static clearCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.getOrCreateCart(userId);
            cart.items = [];
            yield cart.save();
            return cart;
        });
    }
    static syncCart(userId, cartItems) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Ensure userId is a valid ObjectId
                const userObjectId = new mongoose_1.Types.ObjectId(userId);
                // Find the user's cart
                let cart = yield Cart_1.CartModel.findOne({ userId: userObjectId });
                // If cart does not exist, create a new one
                if (!cart) {
                    cart = new Cart_1.CartModel({ userId: userObjectId, items: [] });
                }
                // Sync items: update existing items or add new ones
                cartItems.forEach(item => {
                    const existingItem = cart.items.find(i => i.productId === item.hsnCode);
                    if (existingItem) {
                        existingItem.quantity += item.quantity; // Update quantity
                    }
                    else {
                        cart.items.push({ productId: item.hsnCode, quantity: item.quantity }); // Add new item
                    }
                });
                // Save the cart to the database
                yield cart.save();
                return cart; // Returning the updated cart
            }
            catch (error) {
                console.error('Error syncing cart:', error);
                throw new Error('Failed to sync cart.');
            }
        });
    }
}
exports.CartService = CartService;
