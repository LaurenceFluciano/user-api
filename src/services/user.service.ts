import UserEntity from "../entity/user.entity.js";
import { GetUserDTO, PostUserDTO } from "../DTOs/user.dto.js";
import UserRepository from "../repository/interfaces/user.repository.js";
import UserRepositoryMYSQL from "../repository/user.mysql.repository.js";
import ServiceError from "./service.error.js"
import CryptographyService from "./bcrypt.service.js";
import validator from 'validator';
import 'dotenv/config'

class UserService {
    private repository: UserRepository<UserEntity>;

    public constructor(repository: UserRepository<UserEntity>) {
        this.repository = repository;
    }

    public async fetchAllUsersService(): Promise<GetUserDTO[] | Error>  {
        let users = await this.repository.findAll()
        console.log(users)
        if (users.length === 0) {
            throw new ServiceError("Nenhum usuário encontrado", 404);
        }

        const UsersDTO: GetUserDTO[] = users.map((user: any) => {
            return new GetUserDTO(user.id, user.username, user.email, user.createAt)
        })
    
        return UsersDTO;
    }

    public async fetchUserById(id: any): Promise<GetUserDTO | Error> {
        const userId = parseInt(id, 10);
        
        if (isNaN(userId)) {
            throw new ServiceError("ID inválido", 400)
        }

        let user: UserEntity = await this.repository.findById(userId)

        if(!user) {
            throw new ServiceError("Não foi possível encontrar esse usuário", 404)
        }

        const userDTO: GetUserDTO = new GetUserDTO(user.id, user.username, user.email, user.createAt)
        return userDTO
    }

    public async createUserService(body: PostUserDTO): Promise<void | Error> {
        if (!body.username || !body.email || !body.password) {
           throw new ServiceError("Campos obrigatórios faltando", 400);
        }
        const usernameLower = body.username.toLowerCase()

        if(!validator.matches(usernameLower,  /^[a-z0-9_]+$/)) {
            throw new ServiceError("Esse nome de usuário é inválido", 400);
        }

        if (!validator.isEmail(body.email)) {
            throw new ServiceError("Esse endereço de email é inválido", 400);
        }

        const hashedPassword = await CryptographyService.hashPassword(body.password)

        const userEntity: UserEntity = {
            username: usernameLower,
            email: body.email,
            password: hashedPassword,
        }

        await this.repository.create(userEntity);
    }
}

const userRepository = new UserRepositoryMYSQL();
const userService = new UserService(userRepository);
export default userService;