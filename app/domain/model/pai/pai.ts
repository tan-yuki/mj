import {PaiType} from "./pai-type";

export interface Pai {
  getPaiType(): PaiType;

  getSortIndex(): number;

  getName(): string;

  toString(): string;

  isJihai(): boolean;
}
