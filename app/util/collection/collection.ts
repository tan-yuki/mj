export interface Collection<T> {
  add(entity: T): Collection<T>;
  deleteAt(index: number): Collection<T>;
  getEntities(): Array<T>;
  toArray(): Array<T>;
  length(): number;
  get(index: number): T;
  deleteFirstElementWith(cb: (e:T) => boolean): Collection<T>;
  groupBy(cb: (e:T) => any): {[key:string]: Array<T>};
}
