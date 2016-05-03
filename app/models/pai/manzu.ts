import {AbstractSuupai} from "./abstract-suupai";
import {PaiType} from "./pai-type";

export class Manzu extends AbstractSuupai {
  constructor(num: number) {
    super(PaiType.MANZU, num);
  }
}
