export interface Repository<T> {
  create(entity: T): Promise<T>;
  update(entity: T): Promise<void>;
  findOne(id: number): Promise<T>;
  findAll(): Promise<T[]>;
}