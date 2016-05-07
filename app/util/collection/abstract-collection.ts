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

  getEntities(): Array<T> {
    return this.createClonedEntities();
  }

  toArray(): Array<T> {
    return this.getEntities();
  }

  length(): number {
    return this.entities.length;
  }

  get(index: number): T {
    return this.getEntities()[index];
  }

  private newInstance(entities: Array<T>): Collection<T> {
    return new (<any>this.constructor)(entities);
  }

  private createClonedEntities(): Array<T> {
    return [].concat(this.entities);
  }
}
