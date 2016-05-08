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

  static TON   = new Jihai(1, 'ton');
  static NAN   = new Jihai(2, 'nan');
  static SHA   = new Jihai(3, 'sya');
  static PEI   = new Jihai(4, 'pei');
  static HAKU  = new Jihai(5, 'haku');
  static HATSU = new Jihai(6, 'hatsu');
  static TYUN  = new Jihai(7, 'tyun');
}
