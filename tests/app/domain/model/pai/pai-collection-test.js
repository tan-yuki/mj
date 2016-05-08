import assert from "power-assert";

import {PaiCollection} from "../../../../../dist/domain/model/pai/pai-collection";
import {Souzu}         from "../../../../../dist/domain/model/pai/souzu";
import {Manzu}         from "../../../../../dist/domain/model/pai/manzu";
import {Pinzu}         from "../../../../../dist/domain/model/pai/pinzu";
import {Jihai}         from "../../../../../dist/domain/model/pai/jihai";

describe(`PaiCollection`, () => {
  describe(`#add`, () => {
    it(`should return new PaiCollection`, () => {
      let collection = new PaiCollection([
        new Souzu(1)
      ]);
      let newCollection = collection.add(new Souzu(1));

      assert(newCollection instanceof PaiCollection);
    });
  });
  describe(`#filter`, () => {
    it(`should return new PaiCollection`, () => {
      let collection = new PaiCollection([
        new Souzu(1)
      ]);
      let newCollection = collection.filter((_) => false);

      assert(newCollection instanceof PaiCollection);
    });
  });
  describe(`#toString`, () => {
    it(`should return this collection as string`, () => {
      let collection = new PaiCollection([
        new Souzu(1),
        new Pinzu(2),
        new Manzu(3),
        Jihai.HAKU
      ]);

      assert(collection.toString() === '[1s,2p,3m,haku]');
    });
  });
  describe(`#riipai`, () => {
    it(`should return sorted collection`, () => {
      let collection = new PaiCollection([
        Jihai.NAN,
        new Pinzu(1),
        new Manzu(9),
        new Souzu(2),
        new Pinzu(6),
        new Manzu(1),
        Jihai.HAKU,
        new Manzu(9),
        new Souzu(1),
        new Souzu(3),
        new Pinzu(9),
        new Manzu(9),
        Jihai.HATSU,
        new Manzu(1)
      ]);

      assert(collection.riipai().toString() ===
        '[1m,1m,9m,9m,9m,1p,6p,9p,1s,2s,3s,nan,haku,hatsu]');
    });
  });
});
