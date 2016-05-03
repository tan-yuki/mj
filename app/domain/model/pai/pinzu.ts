import {AbstractSuupai} from "./abstract-suupai";
import {PaiType} from "./pai-type";

export class Pinzu extends AbstractSuupai {
  constructor(num: number) {
    super(PaiType.PINZU, num);
  }
}
