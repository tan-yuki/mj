export interface Collection<T> {
  add(entity: T): Collection<T>;
  deleteAt(index: number): Collection<T>;
  getEntities(): Array<T>;
  toArray(): Array<T>;
  length(): number;
  get(index: number): T;
}
