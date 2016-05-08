export interface Collection<T> {
  add(entity: T): Collection<T>;
  deleteAt(index: number): Collection<T>;
  deleteFirstElementWith(cb: (e:T) => boolean): Collection<T>;
  filter(cb: (e:T) => boolean): Collection<T>;
  get(index: number): T;
  getEntities(): Array<T>;
  groupBy(cb: (e:T) => any): {[key:string]: Array<T>};
  length(): number;
  shift(): [T, Collection<T>];
  shiftFirstElementWith(cb: (e:T) => boolean): [T, Collection<T>];
  toArray(): Array<T>;
}
