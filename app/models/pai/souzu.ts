import {AbstractSuupai} from "./abstract-suupai";
import {PaiType} from "./pai-type";

export class Souzu extends AbstractSuupai {
  constructor(num: number) {
    super(PaiType.SOUZU, num);
  }
}
