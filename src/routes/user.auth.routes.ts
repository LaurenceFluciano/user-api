import { Router } from "express";
import userAuthController from "../controller/user.auth.controller.js";
import asyncHandler from "../configs/asyncHandler.js"
import authMiddleware from "../middleware/user.auth.middleware.js"
const router = Router()


router.route('/login')
    .post(asyncHandler(userAuthController.loginUserController))

router.route('/profile')
    .get(asyncHandler(authMiddleware),asyncHandler(userAuthController.getProfile))

export default router