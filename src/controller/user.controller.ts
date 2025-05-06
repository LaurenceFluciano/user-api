import { Request, Response } from "express";
import userService from "../services/user.service.js"
import ServiceError from "../services/service.error.js"

class UserController {
    async getAllUserController(req: Request ,res: Response) {
        try {
            const users = await userService.fetchAllUsersService()
            res.status(200).json(users)
        } catch (error) {
            console.log(error)
            if (error instanceof ServiceError) {
                return res.status(error.status).json({ message: error.message });
            } else {
                return res.status(500).json({ message: "Erro interno do servidor" });
            }
        }
    }

    async getUserByIdController(req: Request, res: Response) {
        try {
            const user = await userService.fetchUserById(req.params.id)
            res.status(200).json(user)
        } catch (error) {
            if (error instanceof ServiceError) {
                return res.status(error.status).json({ message: error.message });
            } else {
                return res.status(500).json({ message: "Erro interno do servidor" });
            }
        }
    }

    async createUserController(req: Request ,res: Response) {
        try {
            await userService.createUserService(req.body)

            res.status(201).json({message: "Usuário criado com sucesso"})
        } catch (error) {
            if (error instanceof ServiceError) {
                return res.status(error.status).json({ message: error.message });
            } else {
                return res.status(500).json({ message: "Erro interno do servidor" });
            }
        }
    }

}

const userController = new UserController()
export default userController