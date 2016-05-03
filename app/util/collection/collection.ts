export interface Collection<T> {
  sortWith(cb: Function): Collection<T>;
  add(entity: T): Collection<T>;
  deleteAt(index: number): Collection<T>;
}
