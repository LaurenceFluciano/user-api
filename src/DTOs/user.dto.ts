class GetUserDTO {
    constructor(
        public readonly id: number,
        public readonly username: string,
        public readonly email: string,
        public readonly createAt: string
    ) {}
}

class PostUserDTO {
    constructor(
        public readonly username: string,
        public readonly email: string,
        public readonly password: string
    ) {}
}

class UpdateUserDTO {
    constructor(
        public readonly username: string,
        public readonly email: string,
        public readonly password: string
    ) {}
}

class DeleteUserDTO {
    constructor(
        public readonly id: number,
        public readonly email?: string
    ) {}
}


export {
    GetUserDTO,
    PostUserDTO,
    UpdateUserDTO,
    DeleteUserDTO
}