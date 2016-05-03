import {PaiType} from "./pai-type";

export interface Pai {
  getPaiType(): PaiType;

  getName(): string;
}
