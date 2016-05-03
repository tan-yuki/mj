import assert from "power-assert";

import {Souzu}   from "../../../../dist/models/pai/souzu";
import {Manzu}   from "../../../../dist/models/pai/manzu";
import {Pinzu}   from "../../../../dist/models/pai/pinzu";
import {PaiType} from "../../../../dist/models/pai/pai-type";

describe(`Pai`, () => {
  describe(`Suupai`, () => {
    it(`should has number`, () => {
        let pai = new Souzu(1);
        assert(pai.getNumber() === 1);
    });

    it(`should throw exception when given number is lower than 1`, () => {
      assert.throws(() => {
        new Souzu(0);
      });
    });

    it(`should throw exception when given number is greater than 9`, () => {
      assert.throws(() => {
        new Pinzu(10);
      });
    });

    describe(`Souzu`, () => {
      it(`should has PaiType: SOUZU`, () => {
        let pai = new Souzu(1);
        assert(pai.paiType === PaiType.SOUZU);
      });
    });
    describe(`Manzu`, () => {
      it(`should has PaiType: MANZU`, () => {
        let pai = new Manzu(1);
        assert(pai.paiType === PaiType.MANZU);
      });
    });
    describe(`Souzu`, () => {
      it(`should has PaiType: PINZU`, () => {
        let pai = new Pinzu(1);
        assert(pai.paiType === PaiType.PINZU);
      });
    });
  });
});
