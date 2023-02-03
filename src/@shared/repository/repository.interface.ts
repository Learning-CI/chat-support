export interface Repository<T> {
  create(entity: T): Promise<T>;
  update(entity: T): Promise<T>;
  findOne(id: number): Promise<T>;
  findAll(): Promise<T[]>;
}
