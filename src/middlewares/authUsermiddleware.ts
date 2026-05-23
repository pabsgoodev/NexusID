import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export function authUser(req: Request, res: Response, next: NextFunction) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: 'Token missing'
        });
    }

    try {

        jwt.verify(token, process.env.JWT_SECRET!);

        next();

    } catch {

        return res.status(401).json({
            message: 'Invalid token'
        });
    }
}