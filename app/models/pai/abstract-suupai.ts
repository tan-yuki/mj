import {Suupai} from "./suupai";
import {PaiType} from "./pai-type";
import {SuupaiNumberOutOfBoundException} from "./exception/suupai-number-out-of-bound-exception";

export abstract class AbstractSuupai implements Suupai {
  constructor(private paiType: PaiType,
              private num: number
             ) {
    if (num < 1 || num > 9) {
      throw new SuupaiNumberOutOfBoundException(`数牌の数値が不正: ${num}`);
    }
  }

  getNumber(): number {
    return this.num;
  }

  getPaiType(): PaiType {
    return this.paiType;
  }
}
