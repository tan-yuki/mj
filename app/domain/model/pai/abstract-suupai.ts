import {Suupai} from "./suupai";
import {AbstractPai} from "./abstract-pai";
import {PaiType} from "./pai-type";

export abstract class AbstractSuupai extends AbstractPai implements Suupai {
  constructor(private paiType: PaiType,
              private num: number
             ) {
    super();
    console.assert(1 <= num && num <= 9, `数配の数が不正です`);
  }

  getNumber(): number {
    return this.num;
  }

  getPaiType(): PaiType {
    return this.paiType;
  }

  getName(): string {
    return `${this.num}${this.getPaiType().getNameSuffix()}`;
  }

  getSortIndex(): number {
    return this.getNumber();
  }

}
