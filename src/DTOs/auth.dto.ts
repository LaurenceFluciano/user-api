class JwtPayload  {
    constructor(
        public readonly id:  number, 
        public readonly email: string, 
        public readonly username: string
    ) {}
}

class LoginDTO {
    constructor(
        public readonly email: string,
        public readonly password: string
    ){}
}

export {
    JwtPayload ,
    LoginDTO
}