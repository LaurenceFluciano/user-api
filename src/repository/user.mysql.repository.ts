import mysqlConnection from "../configs/connection.js";
import UserEntity from "../entity/user.entity.js";
import UserRepository from "./interfaces/user.repository.js";

class UserRepositoryMYSQL implements UserRepository<UserEntity> {
    public async findAll(): Promise<UserEntity[]> {
        let mysqlInstance: any;
        try{
            mysqlInstance = await mysqlConnection.startConnection();
            const [results] = await mysqlInstance.query('SELECT * FROM user');
            return results.map((result: any) => {
                return new UserEntity( 
                    result.username, 
                    result.email, 
                    result.password, 
                    result.id, 
                    result.create_at, 
                    result.updated_at)
            })
        } catch(error) {
            console.log(error)
            throw error;
        } finally {
            await mysqlInstance.end();
            console.log('Conexão fechada.');
        }
    }

    public async findById(id: number): Promise<UserEntity> {
        let mysqlInstance: any;
        try{
            mysqlInstance = await mysqlConnection.startConnection();
            const [result] = await mysqlInstance.query('SELECT * FROM user WHERE id = ?', [id]);
            return result
        } catch(error) {
            console.log(error)
            throw error;
        } finally {
            await mysqlInstance.end();
            console.log('Conexão fechada.');
        }
    }

    public async findOneBy(condition: Partial<any>): Promise<UserEntity | null>{
        let mysqlInstance: any;
        let query = 'SELECT * FROM user WHERE 1 = 1'
        const params: any[] = [];
        try{
            for (const key in condition) {
                if (condition[key]) {
                    query += ` AND ${key} = ?`;
                    params.push(condition[key]);
                }
            }
            mysqlInstance = await mysqlConnection.startConnection();
            const [results] = await mysqlInstance.query(query, params);

            
            return results.length > 0 ? results[0] : null;
        } catch(error) {
            console.log(error)
            throw error;
        } finally {
            if (mysqlInstance) {
                await mysqlInstance.end();
                console.log('Conexão fechada.');
            }
        }
    }

    public async findManyBy(condition: Partial<any>): Promise<UserEntity[]>{
        throw new Error("Deve ser implementado")
    }

    public async create(entity: UserEntity): Promise<void>{
        let mysqlInstance: any;
        try {
            mysqlInstance = await mysqlConnection.startConnection();
            await mysqlInstance.execute(
                `INSERT INTO user (username, email, password) VALUES (?, ?, ?)`, 
                [entity.username, entity.email, entity.password]);

            console.log("Usuário criado com sucesso")
        } catch (error) {
            console.log(error)
            throw error;
        } finally {
            if (mysqlInstance) {
                await mysqlInstance.end();
                console.log("Conexão fechada");
            }
        }
    }

    public async update(entity: any): Promise<void>{
        throw new Error("Deve ser implementado")
    }

    public async delete(id: number): Promise<void>{
        throw new Error("Deve ser implementado")
    }
}

export default UserRepositoryMYSQL