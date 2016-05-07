import assert from "power-assert";

import {Paiyama} from "../../../../../dist/domain/model/paiyama/paiyama";
import {Tehai}   from "../../../../../dist/domain/model/tehai/tehai";

describe(`Paiyama`, () => {
  let yama;
  before(() => {
    yama = (new Paiyama()).initialize();
  });

  describe(`#initialize`, () => {
    it(`should has return 136 tehai`, () => {
      assert(yama.getAllPai().length === 136)
    });
  });

  describe(`#serveTehaiToPlayer`, () => {
    it(`should has return tehai and remain paiyama`, () => {
      let [tehais, remains] = yama.serveTehaiToPlayer(4);

      assert(tehais.length === 4);
      tehais.forEach((h) => {
        assert(h instanceof Tehai);
      });
      assert(remains instanceof Paiyama);

      assert(remains.getAllPai().length = 136 - 13 * 4);
    });
  });
});
