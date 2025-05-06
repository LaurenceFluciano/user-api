import jwt from 'jsonwebtoken';
import { JwtPayload } from '../../../DTOs/auth.dto.js'

export function generateToken(payload: JwtPayload): string {
    return jwt.sign(payload, process.env.JWT_SECRET as string);
}
