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
exports.AuthController = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    static signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password } = req.body;
            try {
                const existingUser = yield User_1.default.findOne({ email });
                if (existingUser) {
                    res.status(400).json({ message: 'User already exists' });
                    return;
                }
                const newUser = new User_1.default({ username, email, password });
                yield newUser.save();
                res.status(201).json({ message: 'User created successfully' });
            }
            catch (error) {
                res.status(500).json({ message: 'Error creating user' });
            }
        });
    }
    ;
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const user = yield User_1.default.findOne({ email });
                if (!user) {
                    res.status(400).json({ message: 'Invalid credentials' });
                    return;
                }
                const isMatch = yield user.comparePassword(password);
                if (!isMatch) {
                    res.status(400).json({ message: 'Invalid credentials' });
                    return;
                }
                const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.status(200).json({
                    token,
                    username: user.username,
                });
            }
            catch (error) {
                res.status(500).json({ message: 'Error logging in' });
            }
        });
    }
    ;
}
exports.AuthController = AuthController;
