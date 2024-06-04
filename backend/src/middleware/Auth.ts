import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser'; // Ensure you use this in your Express app

declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["auth_token"];
    if (!token) {
        console.log('No token found in cookies');
        return res.status(401).send({ msg: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;
        req.userId = decoded.userId;
        console.log('Token verified successfully, userId:', req.userId);
        next();
    } catch (e) {
        console.log('Token verification error:', e);
        return res.status(401).send({ msg: "Unauthorized" });
    }
};

export default verifyToken;


