import { Connection } from "mysql2/promise"

export default interface Connect {
    startConnection(): Promise<Connection | null>;
}
