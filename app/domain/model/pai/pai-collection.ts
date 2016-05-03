import {AbstractCollection} from "../../../util/collection/abstract-collection";
import {Pai} from "./pai";

export class PaiCollection extends AbstractCollection<Pai> {

  newInstance(entities: Array<Pai>): PaiCollection {
    return new PaiCollection(entities);
  }
}
