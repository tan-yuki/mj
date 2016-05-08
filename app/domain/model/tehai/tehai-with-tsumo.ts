/// <reference path="../../../../typings/main.d.ts" />
import * as lodash from "lodash";

import {AbstractCollection} from "../../../util/collection/abstract-collection";
import {Pai} from "../pai/pai";
import {Suupai} from "../pai/suupai";
import {PaiType} from "../pai/pai-type";
import {PaiCollection} from "../pai/pai-collection";
import {Tehai} from "./tehai";
import {NotCompletedTehaiFormat} from "./exception/not-completed-tehai-fomat";

export interface IMentsu {
  shunts: Array<PaiCollection>;
  kotsus: Array<PaiCollection>;
  jantou: PaiCollection;
}

class SuupaiCollection extends AbstractCollection<Suupai> {
}

export class TehaiWithTsumo {

  constructor(private tehai: Tehai,
              private tsumo: Pai) {
  }

  /**
   * 飜数と符数を計算する
   * 第一要素が飜数、第二要素が符数
   *
   * @return [number, number]
   */
  calcFanAndFu(): boolean {
    throw new Error(`Not implemented`);
  }

  /**
   * 面子の要素に分けた状態で返す
   *
   * @return IMentsu
   * @throws NotCompletedTehaiFormat
   *   和了の形になっていない場合はこの例外が投げられる。
   */
  parseMentsu(): IMentsu {
    let sortedPais = this.getTehaiPais();

    let remains: Array<Pai> = sortedPais;
    let shunts: Array<Array<Pai>>;
    let kotsus: Array<Array<Pai>>;
    let jantou: Array<Pai>;

    // parse shunts
    let suupaiSortedPais = remains.filter((p) => !p.isJihai()).map((e) => <Suupai>e);
    [shunts, remains] = this.parseShuntsu(suupaiSortedPais);

    // parse kotsus
    [kotsus, remains] = this.parseKotsu(remains);

    // remains is jantou?
    if (this.isJantou(remains)) {
      jantou = remains;
    } else {
      throw new NotCompletedTehaiFormat(`手牌がまだ和了の形ではありません: ${this.tehai.toString()}`);
    }

    return <IMentsu>{
      "shunts": shunts.map((ps) => new PaiCollection(ps)),
      "kotsus": kotsus.map((ps) => new PaiCollection(ps)),
      "jantou": new PaiCollection(jantou)
    };
  }

  /**
   * 配の配列を順子に分けた状態で返す。
   * 順子にできた配列と、順子に出来なかった配列を返す。
   * 順子に出来た配列が存在している場合、順子の組み合わせの配列を一つの要素とした配列として返す。
   *
   * @param pais 数配の配の配列
   * @return 第一要素: 面子の配列, 第二要素: 面子にできなかった残りの配
   *
   * 下記の様な状態で返される想定
   * ```
   *  [
   *    [
   *      [new Souzu(1), new Souzu(2), new Souzu(3)],
   *      [new Souzu(3), new Souzu(4), new Souzu(5)],
   *    ],
   *    [new Souzu(9), new Souzu(9)]
   *  ]
   * ```
   *
   */
  private parseShuntsu(pais: Array<Suupai>): [Array<Array<Pai>>, Array<Pai>] {
    // 返り値
    let maps:Array<Array<Pai>> = [];
    let remains:Array<Pai>     = [];
    let cursorCollection = new SuupaiCollection(pais);

    while(true) {
      let [p0, p0Collection] = cursorCollection.shift();

      if (!p0) {
        break;
      }

      // 次の数値の配を取得
      let [p1, p1Collection] = p0Collection.shiftFirstElementWith((p) => {
        return p.getPaiType() === p0.getPaiType() && p.getNumber() === p0.getNumber() + 1;
      });
      // 次の次の数値の配を取得
      let [p2, p2Collection] = p1Collection.shiftFirstElementWith((p) => {
        return p.getPaiType() === p0.getPaiType() && p.getNumber() === p0.getNumber() + 2;
      });

      // 連続した3つの数値の配がある場合はmapsに格納
      if (p1 && p2) {
        maps.push([p0, p1, p2]);

        // カーソル用のcollectionを3つの要素を取り除いた値にする
        cursorCollection = new SuupaiCollection(p2Collection.getEntities());
        continue;
      }

      // 連続した3つの数値の配がなかった場合は
      // 最初の要素をremainsに格納
      remains.push(p0);
      // カーソル用のcollectionを最初の要素のみを取り除いた値にする
      cursorCollection = new SuupaiCollection(p0Collection.getEntities());
    }

    return [maps, remains];
  }

  /**
   * 配の配列を刻子に分けた状態で返す。
   * 刻子にできた配列と、刻子に出来なかった配列を返す。
   * 刻子に出来た配列が存在している場合、刻子の組み合わせの配列を一つの要素とした配列として返す。
   *
   * @param pais 配の配列
   * @return 第一要素: 面子の配列, 第二要素: 面子にできなかった残りの配
   *
   * 下記の様な状態で返される想定
   * ```
   *  [
   *    [
   *      [new Souzu(1), new Souzu(1), new Souzu(1)],
   *      [new Souzu(3), new Souzu(3), new Souzu(3)],
   *    ],
   *    [new Souzu(9), new Souzu(9)]
   *  ]
   * ```
   *
   */
  private parseKotsu(pais: Array<Pai>): [Array<Array<Pai>>, Array<Pai>] {
    let maps: Array<Array<Pai>> = [];

    let cursorCollection = new PaiCollection(pais);
    let group = cursorCollection.groupBy((e) => e.toString());

    // 返り値の型
    //   - 第一要素: 刻子の集合
    //   - 第二要素: その他の配の集合
    return lodash.reduce<string, [Array<Array<Pai>>, Array<Pai>]>(Object.keys(group), (previous, name) => {
      if (group[name].length >= 3) {
        previous[0].push(group[name]);
      } else {
        previous[1] = previous[1].concat(group[name]);
      }
      return previous;
    }, [[], []]);
  }

  /**
   * 雀頭の条件を満たす配の配列であればtrue,そうでなければfalseを返す
   *
   * @param pais
   * @return boolean
   */
  private isJantou(pais: Array<Pai>): boolean {
    let collection = new PaiCollection(pais);
    let group = collection.groupBy((e) => e.toString());

    if (collection.length() === 2 && Object.keys(group).length === 1) {
      return true;
    }

    return false;
  }

  /**
   * ツモ後の手牌をリーパイした後の配のリストを返す
   *
   * @return Array<Pai>
   */
  private getTehaiPais(): Array<Pai> {
    let pais = this.tehai.getEntities();
    pais.push(this.tsumo);
    let collection = new PaiCollection(pais);

    return collection.riipai().getEntities();
  }

  /**
   * 和了かどうかを判定する
   */
  private isHora(): boolean {
    return false;
  }

  /**
   * 七対子かどうかを判定する
   */
  private isChitoitsu(): boolean {
    return false;
  }

  private isYakuman(): boolean {
    return false;
  }

}
