import {AbstractCollection} from "../../../util/collection/abstract-collection";
import {Pai} from "./pai";

export class PaiCollection extends AbstractCollection<Pai> {
  toString(): string {
    let content = this.getEntities().map((e) => {
      return e.toString();
    }).join(`,`);

    return `[${content}]`;
  }

  riipai(): PaiCollection {
    let newCollection = this.getEntities().sort((a, b) => {
      let aPaiType = a.getPaiType();
      let bPaiType = b.getPaiType();

      if (aPaiType !== bPaiType) {
        return (aPaiType.getSortIndex() > bPaiType.getSortIndex()) ? 1 : -1;
      }

      return (a.getSortIndex() > b.getSortIndex()) ? 1 : -1;
    });

    return new PaiCollection(newCollection);
  }

}
