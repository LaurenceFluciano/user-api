import { Router } from "express";
import userController from "../controller/user.controller.js";
import asyncHandler from "../configs/asyncHandler.js"
import verifyAdminToken from "../middleware/admin.auth.middleware.js"
const router = Router()


router.route('/')
    .get(verifyAdminToken, asyncHandler(userController.getAllUserController))
    .post(asyncHandler(userController.createUserController))

router.route('/:id')
    .get(verifyAdminToken, asyncHandler(userController.getUserByIdController))


export default router