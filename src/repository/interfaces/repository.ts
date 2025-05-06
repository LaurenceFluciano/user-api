export default interface Repository<T> {
    findAll(): Promise<T[]>;
    findById(id: number): Promise<T>;
    findOneBy(condition: Partial<T>): Promise<T | null>;
    findManyBy(condition: Partial<T>): Promise<T[]>;
    create(entity: T): Promise<void>;
    update(entity: T): Promise<void>;
    delete(id: number): Promise<void>;
}