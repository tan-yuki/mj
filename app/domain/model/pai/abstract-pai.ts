import {Pai} from "./pai";
import {PaiType} from "./pai-type";
import {Jihai} from "./jihai";

export abstract class AbstractPai implements Pai {
  toString(): string {
    return this.getName();
  }

  isJihai(): boolean {
    return this.getPaiType() === PaiType.JIHAI;
  }

  abstract getSortIndex(): number;
  abstract getPaiType(): PaiType;
  abstract getName(): string;
}
