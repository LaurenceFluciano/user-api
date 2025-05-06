import UserEntity from "../../entity/user.entity.js";
import { LoginDTO } from "../../DTOs/auth.dto.js"
import UserRepository from "../../repository/interfaces/user.repository.js";
import UserRepositoryMYSQL from "../../repository/user.mysql.repository.js";
import ServiceError from "../service.error.js"
import CryptographyService from "../bcrypt.service.js";
import validator from 'validator';
import 'dotenv/config'
import {generateToken} from "./modules/jwt.token.generator.service.js"
import jwt from "jsonwebtoken"

class AuthUserService {
    private repository: UserRepository<UserEntity>;

    public constructor(repository: UserRepository<UserEntity>) {
        this.repository = repository;
    }

    public async loginService(body: LoginDTO){
        if (!body.email || !body.password) {
            throw new ServiceError("Campos obrigatórios faltando", 400);
        }

        if (!validator.isEmail(body.email)) {
            throw new ServiceError("Esse endereço de email é inválido", 400);
        }

        const userEntity: UserEntity = await this.repository.findOneBy({email: body.email})

        if (!userEntity) {
            throw new ServiceError("Usuário não encontrado", 404);
        }

        const isPasswordValid = await CryptographyService.comparePassword(body.password, userEntity.password)

        if (!isPasswordValid) {
            throw new ServiceError("Senha inválida", 400);
        }

        const token = generateToken({
            id: userEntity.id, 
            email: userEntity.email, 
            username: userEntity.username })

        if (!token || typeof token !== 'string') {
            throw new ServiceError("Token inválido", 400);
        }

        return token        
    }

    public async getPayloadToken(header: string | undefined): Promise<any> {
        if (!header || !header.startsWith('Bearer ')) {
            throw new ServiceError("Token não fornecido", 401);
        }
        const token = header.split(' ')[1];

        try {
          
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

            if (typeof decoded === 'string') {
                throw new ServiceError('Token inválido', 401);
            }

            return decoded;
        } catch (err) {
            throw new ServiceError('Token inválido', 401);
        }
    }
}

const userRepository = new UserRepositoryMYSQL();
const authUserService = new AuthUserService(userRepository);
export default authUserService;