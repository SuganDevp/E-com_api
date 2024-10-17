"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const cartController_1 = __importDefault(require("../controllers/cartController"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/', productController_1.ProductController.getProducts);
router.get('/cart', auth_1.Middleware.authenticate, cartController_1.default.getCart);
router.post('/updateCart', auth_1.Middleware.authenticate, cartController_1.default.updateCartItem);
exports.default = router;
