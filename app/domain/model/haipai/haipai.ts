import {AbstractCollection} from "../../../util/collection/abstract-collection";
import {Pai} from "../pai/pai";
import {PaiCollection} from "../pai/pai-collection";
import {TahaiException} from "./exception/tahai-exception";
import {ShouhaiException} from "./exception/shouhai-exception";

export class Haipai extends PaiCollection {

  constructor(entities: Array<Pai>) {
    if (entities.length > 14) {
      throw new TahaiException();
    }

    if (entities.length < 13) {
      throw new ShouhaiException();
    }

    super(entities);
  }

  newInstance(entities: Array<Pai>): Haipai {
    return new Haipai(entities);
  }
}
