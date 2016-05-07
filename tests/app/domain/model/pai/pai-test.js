import assert from "power-assert";

import {Souzu}   from "../../../../../dist/domain/model/pai/souzu";
import {Manzu}   from "../../../../../dist/domain/model/pai/manzu";
import {Pinzu}   from "../../../../../dist/domain/model/pai/pinzu";
import {Jihai}   from "../../../../../dist/domain/model/pai/jihai";
import {PaiType} from "../../../../../dist/domain/model/pai/pai-type";

describe(`Pai`, () => {
  describe(`#isJiahi`, () => {
    it(`Jihai should return true`, () => {
      assert(Jihai.HAKU.isJihai() === true);
    });
    it(`Suupai should return false`, () => {
      assert((new Manzu(3)).isJihai() === false);
    });
  });
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
    describe(`Jihai`, () => {
      it(`should has PaiType: JIHAI`, () => {
        assert(Jihai.TON.getPaiType()   === PaiType.JIHAI);
        assert(Jihai.NAN.getPaiType()   === PaiType.JIHAI);
        assert(Jihai.SHA.getPaiType()   === PaiType.JIHAI);
        assert(Jihai.PEI.getPaiType()   === PaiType.JIHAI);
        assert(Jihai.HAKU.getPaiType()  === PaiType.JIHAI);
        assert(Jihai.HATSU.getPaiType() === PaiType.JIHAI);
        assert(Jihai.TYUN.getPaiType()  === PaiType.JIHAI);
      });
    });
  });
});
