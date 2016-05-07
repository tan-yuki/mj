import {AbstractCollection} from "../../../util/collection/abstract-collection";
import {Pai} from "../pai/pai";
import {PaiCollection} from "../pai/pai-collection";

export class Tehai extends PaiCollection {

  constructor(entities: Array<Pai>) {
    console.assert(entities.length === 13, `手牌数が不正です`);

    super(entities);
  }
}
