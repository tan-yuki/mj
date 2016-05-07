/// <reference path="../../../../typings/main.d.ts" />
import * as lodash from "lodash";

import {PaiCollection} from "../pai/pai-collection";
import {Pai}   from "../pai/pai";
import {Manzu} from "../pai/manzu";
import {Pinzu} from "../pai/pinzu";
import {Souzu} from "../pai/souzu";
import {Jihai} from "../pai/jihai";
import {Tehai} from "../tehai/tehai";

export class Paiyama extends PaiCollection {

  constructor(pais: Array<Pai>) {
    super(pais);
  }

  initialize(): Paiyama {
    let pais = [
      // manzu
      new Manzu(1), new Manzu(2), new Manzu(3), new Manzu(4), new Manzu(5),
      new Manzu(6), new Manzu(7), new Manzu(8), new Manzu(9),
      // pinzu
      new Pinzu(1), new Pinzu(2), new Pinzu(3), new Pinzu(4), new Pinzu(5),
      new Pinzu(6), new Pinzu(7), new Pinzu(8), new Pinzu(9),
      // souzu
      new Souzu(1), new Souzu(2), new Souzu(3), new Souzu(4), new Souzu(5),
      new Souzu(6), new Souzu(7), new Souzu(8), new Souzu(9),
      // jihai
      Jihai.TON, Jihai.NAN, Jihai.SHA, Jihai.PEI,
      Jihai.HAKU, Jihai.HATSU, Jihai.TYUN
    ];

    // 全種類を4つづつ
    let allPais = lodash.flatMap(Array(4), () => pais);

    // ランダムに並び替え
    return new Paiyama(lodash.shuffle(allPais));
  }

  /**
   * プレイヤーの数だけ配牌を配り、残りの山を返す
   *
   * @param playerNum
   * @return [Array<Tehai>, Paiyama]
   */
  serveTehaiToPlayer(playerNum: number): [Array<Tehai>, Paiyama] {

    let entities = this.getEntities();

    let tehais = Array(playerNum).map(() => {
      // TODO: 14というマジックナンバー置き換え
      let pais = entities.splice(0, 14);
      return new Tehai(pais);
    });

    return [tehais, new Paiyama(entities)];
  }

  getAllPai(): Array<Pai> {
    return this.getEntities();
  }
}
