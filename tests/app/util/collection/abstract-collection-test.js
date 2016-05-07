import assert from "power-assert";

import {PaiCollection} from "../../../../dist/domain/model/pai/pai-collection";
import {PaiType}       from "../../../../dist/domain/model/pai/pai-type";
import {Souzu}         from "../../../../dist/domain/model/pai/souzu";
import {Manzu}         from "../../../../dist/domain/model/pai/manzu";
import {Pinzu}         from "../../../../dist/domain/model/pai/pinzu";

describe(`AbstractCollection`, () => {
  describe(`#add`, () => {
    it(`should add entity and return new collection`, () => {
      let collection = new PaiCollection([new Souzu(1), new Pinzu(2)]);
      let newCollection = collection.add(new Manzu(3));
      assert(newCollection.length() === 3);
    });
    it(`should return same type instance`, () => {
      let collection = new PaiCollection([new Souzu(1), new Pinzu(2)]);
      let newCollection = collection.add(new Manzu(3));
      assert(newCollection instanceof PaiCollection);
    });
  });
  describe(`#deleteAt`, () => {
    it(`should delete entity positioned at this index`, () => {
      let collection = new PaiCollection([new Pinzu(1), new Souzu(1), new Manzu(1), new Pinzu(2)]);
      let newCollection = collection.deleteAt(1);

      assert(newCollection.length() === 3);
      assert(newCollection.get(0).getName() === "1筒");
      assert(newCollection.get(1).getName() === "1萬");
      assert(newCollection.get(2).getName() === "2筒");
    });
  });
});
