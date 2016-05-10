import {AbstractCollection} from "../../../util/collection/abstract-collection";
import {Pai} from "./pai";

export class PaiCollection extends AbstractCollection<Pai> {
  toString(): string {
    let content = this.getEntities().map((e) => {
      return e.toString();
    }).join(`,`);

    return `[${content}]`;
  }

  /**
   * 同じ雀牌同士でグルーピングした結果を返す
   *
   * @return key: 雀牌名, value: 雀牌のCollection
   */
  groupBySameJanpai(): {[key:string]: PaiCollection} {
    let arrayGroup = this.groupBy((p) => p.toString());

    // collectionにして返す
    let acc = <{[key:string]: PaiCollection}>{};
    return Object.keys(arrayGroup).reduce((obj, paiName) => {
      obj[paiName] = new PaiCollection(arrayGroup[paiName]);
      return obj;
    }, acc);
  }

  riipai(): PaiCollection {
    let newCollection = this.getEntities().sort((a, b) => {
      let aPaiType = a.getPaiType();
      let bPaiType = b.getPaiType();

      if (aPaiType !== bPaiType) {
        return (aPaiType.getSortIndex() > bPaiType.getSortIndex()) ? 1 : -1;
      }

      return (a.getSortIndex() > b.getSortIndex()) ? 1 : -1;
    });

    return new PaiCollection(newCollection);
  }

  /**
   * 指定した配と等しい物を指定した数だけ削除した状態の
   * collectionを返す
   *
   * @param pai 削除する配
   * @param num 削除する個数
   *
   * @return PaiCollection
   */
  eliminatePai(pai: Pai, num: number = 1): PaiCollection {
    let indexes = this.getAllIndexWith((p) => p.equals(pai));

    return new PaiCollection(this.deleteAt(indexes.slice(0, num)).getEntities());
  }

}
