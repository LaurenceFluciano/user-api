import authUserService from "../services/auth/auth.service.js"
import { Request, Response } from "express";
import ServiceError from "../services/service.error.js"

class UserAuthenticateController {
    async loginUserController(req: Request, res:Response) {
        try {
            const token: string = await authUserService.loginService(req.body)

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",  
                sameSite: "strict", 
                maxAge: 60 * 60 * 1000, 
            });
            
            res.status(200).json({ message: "Login bem-sucedido!" });
        } catch (error) {
            if(error instanceof ServiceError) {
                return res.status(error.status).json({ message: error.message });
            } else {
                return res.status(500).json({ message: "Erro interno do servidor" });
            }
        }
    }

    async getProfile(req: Request, res:Response){
        try {
            res.status(200).json({ user: req.user });
        } catch (error) {
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
}

const userAuthController = new UserAuthenticateController()
export default userAuthController