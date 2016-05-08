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

  deleteAt(indexes: number|Array<number>): Collection<T> {
    let idxs = <Array<number>>(Array.isArray(indexes) ? indexes : [indexes]);

    let entities = this.getEntities();
    idxs.forEach((i) => {
      entities[i] = undefined;
    });

    return this.newInstance(entities.filter((e) => e !== undefined));
  }

  deleteFirstElementWith(cb: (e:T) => boolean): Collection<T> {
    let [_, collection] = this.shiftFirstElementWith(cb);

    return collection;
  }

  /**
   * 条件にマッチした要素を全て取り除く
   *
   * @param cb 条件関数。trueを返す要素の場合は取り除く。
   * @return 取り除いた結果
   *     第一要素: 取り除かれた要素のCollection
   *     第二要素: 取り除かれた後のCollection
   */
  eliminateElementsWith(cb: (e:T) => boolean): [Collection<T>, Collection<T>] {
    let eliminates = this.filter(cb);
    let remains    = this.filter((e) => !cb(e));

    return [eliminates, remains];
  }

  /**
   * 条件にマッチした要素のIndex番号を全て返す
   *
   * @return index番号の配列
   */
  getAllIndexWith(cb:(e:T) => boolean): Array<number> {
    let indexes = [];
    this.getEntities().forEach((e, index) => {
      cb(e) && indexes.push(index);
    });

    return indexes;
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
