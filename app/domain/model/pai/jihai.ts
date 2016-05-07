import {PaiType} from "./pai-type";
import {AbstractPai} from "./abstract-pai";

export class Jihai extends AbstractPai {
  constructor(private sortIndex: number,
              private name: string) {
    super();
  }

  getPaiType(): PaiType {
    return PaiType.JIHAI;
  }

  getSortIndex(): number {
    return this.sortIndex;
  }

  getName(): string {
    return this.name;
  }

  static TON   = new Jihai(1, '東');
  static NAN   = new Jihai(2, '南');
  static SHA   = new Jihai(3, '西');
  static PEI   = new Jihai(4, '北');
  static HAKU  = new Jihai(5, '白');
  static HATSU = new Jihai(6, '發');
  static TYUN  = new Jihai(7, '中');
}
