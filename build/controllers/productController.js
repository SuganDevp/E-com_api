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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = exports.loadProducts = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const productsFilePath = path_1.default.join(__dirname, '../../data/products.json');
;
const loadProducts = () => {
    try {
        const data = fs_1.default.readFileSync(productsFilePath, 'utf8');
        return JSON.parse(data);
    }
    catch (error) {
        console.log('%csrc/controllers/productController.ts:13 error', 'color: #007acc;', error);
    }
    return [];
};
exports.loadProducts = loadProducts;
class ProductController {
    static getProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = (0, exports.loadProducts)();
            res.json(products);
        });
    }
    ;
}
exports.ProductController = ProductController;
