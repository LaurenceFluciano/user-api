import bcrypt from "bcryptjs";


class CryptographyService {
    public static async hashPassword(password: string): Promise<string> {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            return hashedPassword
        } catch (error) {  
            console.error('Erro ao gerar o hash da senha:', error);
            throw new Error('Erro ao gerar o hash da senha.')
        }
    }

    public static async comparePassword(password: string, hashedPassword: string) {
        try {
            const isMatch = await bcrypt.compare(password, hashedPassword)
            return isMatch;
        } catch (error) {
            console.error('Erro na comparação: ', error)
            throw new Error('Erro ao comparar a senha.')
        }
    }
}

export default CryptographyService;