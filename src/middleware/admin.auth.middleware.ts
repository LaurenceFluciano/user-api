import { Request, Response, NextFunction  } from "express";
import 'dotenv/config'

export default function verifyAdminToken(req: Request, res: Response, next: NextFunction): any {
    const authHeader = req.headers['authorization'] 
    const token = authHeader && authHeader.split(' ')[1];

    if (token != process.env.SECRET_TOKEN) {
        return res.status(401).json({ message: 'Acesso negado' });
    } else {
        next()
    }
}