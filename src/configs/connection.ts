import mysql2, { Connection } from "mysql2/promise"
import Connect from "./interfaces/connectInterface.js"
import 'dotenv/config'

class MYSQLconnect implements Connect {
    private connection: Connection | null = null;

    public async startConnection(): Promise<Connection | null> {
        try {
            this.connection = await mysql2.createConnection({
                host:process.env.DATABASE_HOST,
                user:process.env.DATABASE_USER,
                password:process.env.DATABASE_PASSWORD,
                database:process.env.DATABASE_NAME
            });
            console.log("Conexão realizada com sucesso")

            return this.connection
        } catch(error) {
            console.error("Erro ao conectar ao banco de dados:", error);
            return null;
        }   
    }
    
}

const mysqlConnection: Connect = new MYSQLconnect();

export default mysqlConnection

