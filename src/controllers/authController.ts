import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';

export class AuthController {

    static async signup(req: Request, res: Response) {
        const { username, email, password } = req.body;

        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                res.status(400).json({ message: 'User already exists' });
                return
            }

            const newUser = new User({ username, email, password });
            await newUser.save();

            res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error creating user' });
        }
    };

    static async login(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                res.status(400).json({ message: 'Invalid credentials' });
                return
            }

            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                res.status(400).json({ message: 'Invalid credentials' });
                return
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
            res.status(200).json({
                token,
                username: user.username,
            });
        } catch (error) {
            res.status(500).json({ message: 'Error logging in' });
        }
    };
}


