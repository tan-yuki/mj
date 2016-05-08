/// <reference path="../../../typings/main.d.ts" />
import * as lodash from "lodash";

import {Collection} from "./collection";

export abstract class AbstractCollection<T> implements Collection<T> {
  constructor(private entities: Array<T>) {
  }

  add(entity: T): Collection<T> {
    let newEntities = this.createClonedEntities();
    newEntities.push(entity);

    return this.newInstance(newEntities);
  }

  deleteAt(index: number): Collection<T> {
    let newEntities = this.createClonedEntities();
    let befores = newEntities.splice(0, index);
    let afters  = newEntities.splice(1);

    return this.newInstance(befores.concat(afters));
  }

  deleteFirstElementWith(cb: (e:T) => boolean): Collection<T> {
    let [_, collection] = this.shiftFirstElementWith(cb);

    return collection;
  }

  filter(cb: (e:T) => boolean): Collection<T> {
    return this.newInstance(this.getEntities().filter(cb));
  }

  get(index: number): T {
    return this.getEntities()[index];
  }

  getEntities(): Array<T> {
    return this.createClonedEntities();
  }

  groupBy(cb: (e:T) => any): {[key:string]: Array<T>} {
    return lodash.groupBy(this.getEntities(), cb);
  }

  length(): number {
    return this.entities.length;
  }

  shift(): [T, Collection<T>]  {
    let entities = this.getEntities();
    let e = entities.shift();

    return [e, this.newInstance(entities)];
  }

  shiftFirstElementWith(cb: (e:T) => boolean): [T, Collection<T>]  {
    let index = lodash.findIndex(this.getEntities(), cb);
    if (index > -1) {
      return [this.get(index), this.deleteAt(index)];
    }

    return [null, this];
  }

  toArray(): Array<T> {
    return this.getEntities();
  }

  private newInstance(entities: Array<T>): Collection<T> {
    return new (<any>this.constructor)(entities);
  }

  private createClonedEntities(): Array<T> {
    return [].concat(this.entities);
  }
}
