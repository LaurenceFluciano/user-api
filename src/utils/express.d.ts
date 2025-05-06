import { JwtPayload } from '../DTOs/auth.dto.ts'; // Importe a entidade User se necessário
declare global {
    namespace Express {
        interface Request {
            user?: any; 
        }
    }
}
