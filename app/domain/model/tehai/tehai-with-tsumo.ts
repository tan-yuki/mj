/// <reference path="../../../../typings/main.d.ts" />
import * as lodash from "lodash";

import {AbstractCollection} from "../../../util/collection/abstract-collection";
import {Pai} from "../pai/pai";
import {Suupai} from "../pai/suupai";
import {PaiType} from "../pai/pai-type";
import {PaiCollection} from "../pai/pai-collection";
import {Tehai} from "./tehai";
import {NotCompletedTehaiFormat} from "./exception/not-completed-tehai-fomat";

const JANTOU_NUM = 2;
const KOTSU_NUM  = 3;
const CHITOITSU_NUM = 7;

export interface IMentsu {
  chiitoitsus?: Array<PaiCollection>;
  mentsu?: INormalMentsu;
}

export interface INormalMentsu {
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
   * 面子の要素に分けた状態で返す.
   *
   * @return IMentsu
   * @throws NotCompletedTehaiFormat
   *   和了の形になっていない場合はこの例外が投げられる。
   */
  parseMentsu(): IMentsu {
    let sortedPais = this.getTehaiPais();
    let group: {[key:string]: PaiCollection} = sortedPais.groupBySameJanpai();

    if (this.isChitoitsu(group)) {
      return <IMentsu>{
        chiitoitsus: lodash.values<PaiCollection>(group)
      };
    }

    let remains: PaiCollection = sortedPais;
    let shunts: Array<PaiCollection>;
    let kotsus: Array<PaiCollection>;
    let jantou: Array<Pai>;

    let jantouCandidates = this.getJantouCandidates(group);

    let jantouCandidate;
    while(jantouCandidate = jantouCandidates.shift()) {
      let mentsuCandidates = remains.eliminatePai(jantouCandidate, JANTOU_NUM);
      [shunts, kotsus] = this.parseShuntsuOrKotsu(mentsuCandidates);

      // 和了の形としてパースできた場合
      if (shunts.length || kotsus.length) {
        jantou = [jantouCandidate, jantouCandidate];
        break;
      }
    }

    if (!shunts.length && !kotsus.length) {
      throw new NotCompletedTehaiFormat(`手牌がまだ和了の形ではありません: ${this.tehai.toString()}`);
    }

    return <IMentsu>{
      mentsu: <INormalMentsu>{
        shunts: shunts,
        kotsus: kotsus,
        jantou: new PaiCollection(jantou)
      }
    };
  }

  /**
   * 雀頭候補の配を検索し、それらの配を返す
   *
   * @param group
   * @return 雀頭候補の配の配列Index
   */
  private getJantouCandidates(group: {[key:string]: PaiCollection}): Array<Pai> {
    let jantous = [];

    Object.keys(group).forEach((k) => {
      let collection = group[k];
      if (collection.length() >= JANTOU_NUM) {
        jantous.push(collection.get(0));
      }
    });

    return jantous;
  }

  /**
   * 七対子だった場合はtrueを返す
   *
   * @param group
   * @return boolean
   */
  private isChitoitsu(group: {[key:string]: PaiCollection}): boolean {
    let keys = Object.keys(group);
    if (keys.length !== CHITOITSU_NUM) {
      return false;
    }

    return lodash.every(keys, (k) => {
      return group[k].length() === 2;
    });
  }

  /**
   * 配の配列を順子または刻子に分けた状態で返す。
   * 順子または刻子にわけれなかった場合は順子も刻子も空の状態で返す
   *
   * @param pais 配の配列
   * @return 第一要素: 順子の配列, 第二要素: 刻子の配列
   *
   * 下記の様な状態で返される想定
   * ```
   *  [
   *    [
   *      [new Souzu(1), new Souzu(2), new Souzu(3)],
   *      [new Souzu(3), new Souzu(4), new Souzu(5)],
   *    ],
   *    [
   *      [new Pinzu(9), new Pinzu(9), new Pinzu(9)]
   *    ]
   *  ]
   * ```
   *
   */
  private parseShuntsuOrKotsu(pais: PaiCollection): [Array<PaiCollection>, Array<PaiCollection>] {
    let shunts, kotsus, remains;

    [shunts, remains] = this.parseShuntsu(pais);
    [kotsus, remains] = this.parseKotsu(remains);

    if (remains.length() === 0) {
      return [shunts, kotsus];
    }

    return [[], []];
  }

  /**
   * 順子と順子以外の配を返す
   *
   * @return 第一要素: 順子の配列, 第二要素: 残りの配列
   *
   * 下記の様な状態で返される想定
   * ```
   *  [
   *    [
   *      [new Souzu(1), new Souzu(2), new Souzu(3)],
   *      [new Souzu(3), new Souzu(4), new Souzu(5)],
   *    ],
   *    [
   *      [new Pinzu(9), new Pinzu(9), new Pinzu(9), Jihai.HAK, Jihai.HAKUU, Jihai.HAKU]
   *    ]
   *  ]
   * ```
   */
  private parseShuntsu(pais: PaiCollection): [Array<PaiCollection>, PaiCollection] {

    // 返り値
    let shunts:Array<PaiCollection> = [];
    let remains:PaiCollection = new PaiCollection(pais.getEntities());
    let group = pais.groupBySameJanpai();

    // 順子候補として3つ配が揃っているものは除外 (4つ揃っているものは除外しない)
    let kotsuCandidateNames = Object.keys(group)
      .map((k) => group[k])
      .filter((ps) => ps.length() === KOTSU_NUM)
      .map((ps) => ps.get(0).toString());

    let shuntsCandidates = pais.getEntities().filter((p) => {
      return kotsuCandidateNames.indexOf(p.toString()) === -1;
    });

    // 字牌は除外
    shuntsCandidates.forEach((candidate) => {
      let [p0, p0Collection] = remains.shiftFirstElementWith((p) => p.equals(candidate));

      // 次の数値の配を取得
      let [p1, p1Collection] = p0Collection.shiftFirstElementWith((p) => {
        return this.isNextValue(p0, p);
      });

      // 次の次の数値の配を取得
      let [p2, p2Collection] = p1Collection.shiftFirstElementWith((p) => {
        return this.isNextValue(p1, p);
      });

      // 連続した3つの数値の配がある場合はmapsに格納
      if (p0 && p1 && p2) {
        shunts.push(new PaiCollection([candidate, p1, p2]));

        // 格納した配を除外したものを残りの配として格納
        remains = new PaiCollection(p2Collection.getEntities());
      }
    });

    // 除外した字牌を戻して返す
    return [shunts, remains];
  }

  /**
   * p1がp2の次の数牌だった場合にtrueを返す
   *
   * @param p1
   * @param p2
   *
   * @return boolean
   */
  private isNextValue(p1: Pai, p2: Pai): boolean {
    if (!p1 || !p2 || p1.isJihai() || p2.isJihai()) {
      return false;
    }

    return p1.getPaiType() === p2.getPaiType() &&
      (<Suupai>p1).getNumber() + 1 === (<Suupai>p2).getNumber();
  }

  /**
   * 刻子と刻子以外の配を返す
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
   *    []
   *  ]
   * ```
   */
  private parseKotsu(pais: PaiCollection): [Array<PaiCollection>, PaiCollection] {
    let group = pais.groupBySameJanpai();

    let kotsuPais = Object.keys(group)
      .map((k) => group[k])
      .filter((ps) => ps.length() >= KOTSU_NUM)
      .map((ps) => ps.get(0));

    let kotsus = kotsuPais.map((p) => new PaiCollection(lodash.fill(Array(KOTSU_NUM), p)));
    let remains = kotsuPais.reduce((previous, p) => {
      return previous.eliminatePai(p, KOTSU_NUM);
    }, pais);

    return [kotsus, remains];
  }

  /**
   * ツモ後の手牌をリーパイした後の配のリストを返す
   *
   * @return PaiCollection
   */
  private getTehaiPais(): PaiCollection  {
    let pais = this.tehai.getEntities();
    pais.push(this.tsumo);
    let collection = new PaiCollection(pais);

    return collection.riipai();
  }

}
