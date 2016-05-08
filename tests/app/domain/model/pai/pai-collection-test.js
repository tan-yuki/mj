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

      assert(collection.toString() === '[1索,2筒,3萬,白]');
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
        '[1萬,1萬,9萬,9萬,9萬,1筒,6筒,9筒,1索,2索,3索,南,白,發]');
    });
  });
});
