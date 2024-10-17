
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../interface/jwtPayload';
export class Middleware {
    static authenticate = (req: Request, res: Response, next: NextFunction) => {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            res.status(401).json({ message: 'Access denied. No token provided.' });
            return
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
            req.user = decoded;
            next();
        } catch (error) {
            res.status(400).json({ message: 'Invalid token.' });
        }
    };
}

