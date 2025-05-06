import { Request, Response, NextFunction } from "express";
import authUserService from "../services/auth/auth.service.js"
import ServiceError from "../services/service.error.js";

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const decoded = await authUserService.getPayloadToken(req.headers['authorization']);
        req.user = decoded; 
        next(); 
    } catch (err) {
        if(err instanceof ServiceError) {
            return res.status(err.status).json({ message: err.message });
        } else {
            return res.status(500).json({ message: "Erro interno no servidor"});
        }
    }
}