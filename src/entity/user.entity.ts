
export default class UserEntity {
    constructor(
        public readonly username: string,
        public readonly email: string,
        public readonly password: string,
        public readonly id?: number,
        public readonly createAt?: string,
        public readonly updatedAt?: string
    ){}
   
}