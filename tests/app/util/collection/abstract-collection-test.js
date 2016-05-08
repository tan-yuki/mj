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
  describe(`#filter`, () => {
    it(`should filter items that match the condition`, () => {
      let collection = new PaiCollection([new Souzu(1), new Pinzu(2), new Manzu(1), new Souzu(2)]);
      let newCollection = collection.filter((e) => e.getNumber() === 1);
      assert(newCollection.length() === 2);
      assert(newCollection.get(0).toString() === '1索');
      assert(newCollection.get(1).toString() === '1萬');
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
  describe(`#deleteFirstElementWith`, () => {
    it(`should delete entity that matched condition and positioned at first`, () => {
      let collection = new PaiCollection([new Pinzu(1), new Souzu(1), new Pinzu(1), new Manzu(1)]);
      let newCollection = collection.deleteFirstElementWith((p) => {
        return p.getPaiType() === PaiType.PINZU;
      });

      assert(newCollection.length() === 3);
      assert(newCollection.get(0).getName() === "1索");
      assert(newCollection.get(1).getName() === "1筒");
      assert(newCollection.get(2).getName() === "1萬");
    });
    it(`should not delete any entity if there is no elements match the condition`, () => {
      let collection = new PaiCollection([new Pinzu(1), new Souzu(1), new Manzu(1)]);
      let newCollection = collection.deleteFirstElementWith((p) => {
        return p.getPaiType() === PaiType.JIHAI;
      });

      assert(newCollection.length() === 3);
      assert(newCollection.get(0).getName() === "1筒");
      assert(newCollection.get(1).getName() === "1索");
      assert(newCollection.get(2).getName() === "1萬");
    });
  });
  describe(`#groupBy`, () => {
    it(`should separate each group`, () => {
      let collection = new PaiCollection([new Pinzu(1), new Souzu(1), new Manzu(1), new Pinzu(2)]);
      let group = collection.groupBy((p) => {
        return p.getPaiType().toString();
      });

      assert(Object.keys(group).length === 3);
      assert(group[PaiType.MANZU.getName()].length === 1);
      assert(group[PaiType.PINZU.getName()].length === 2);
      assert(group[PaiType.SOUZU.getName()].length === 1);
    });
  });
});
