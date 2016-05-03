import {PaiType} from "./pai-type";
import {Pai} from "./pai";

export class Jihai implements Pai {
  constructor(private sortIndex: number,
              private name: string) {
  }

  getPaiType(): PaiType {
    return PaiType.JIHAI;
  }

  getSortIndex() {
    return this.sortIndex;
  }

  getName() {
    return this.name;
  }

  static TON   = new Jihai(1, '東');
  static NAN   = new Jihai(2, '南');
  static SHA   = new Jihai(3, '西');
  static PAI   = new Jihai(4, '北');
  static HAKU  = new Jihai(5, '白');
  static HATSU = new Jihai(6, '發');
  static TYUN  = new Jihai(7, '中');
}
