/// <reference path="../../../typings/main.d.ts" />
import * as lodash from "lodash";

import {Collection} from "./collection";

export abstract class AbstractCollection<T> implements Collection<T> {
  constructor(private entities: Array<T>) {
  }

  abstract newInstance(entities: Array<T>): Collection<T>;

  sortWith(cb: Function): Collection<T> {
    return this.newInstance(lodash.sortBy(this.entities, cb));
  }

  add(entity: T): Collection<T> {
    let newEntities = [].concat(this.entities)
    newEntities.push(entity);

    return this.newInstance(newEntities);
  }

  deleteAt(index: number): Collection<T> {
    let befores = this.entities.splice(0, index - 1);
    let afters = this.entities.splice(index);

    return this.newInstance(befores.concat(afters));
  }
}
