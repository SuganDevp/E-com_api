"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const cartController_1 = require("../controllers/cartController");
const router = express_1.default.Router();
router.get('/', auth_1.Middleware.authenticate, cartController_1.CartController.getCart);
router.post('/update', auth_1.Middleware.authenticate, cartController_1.CartController.updateItem);
router.post('/remove', auth_1.Middleware.authenticate, cartController_1.CartController.removeItem);
router.post('/clear', auth_1.Middleware.authenticate, cartController_1.CartController.clearCart);
router.post('/add', auth_1.Middleware.authenticate, cartController_1.CartController.addItem);
exports.default = router;
