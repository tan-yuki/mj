import assert from "power-assert";

import {TehaiWithTsumo} from "../../../../../dist/domain/model/tehai/tehai-with-tsumo";
import {Tehai}          from "../../../../../dist/domain/model/tehai/tehai";
import {Pai}            from "../../../../../dist/domain/model/pai/pai";
import {Souzu}          from "../../../../../dist/domain/model/pai/souzu";
import {Manzu}          from "../../../../../dist/domain/model/pai/manzu";
import {Pinzu}          from "../../../../../dist/domain/model/pai/pinzu";
import {Jihai}          from "../../../../../dist/domain/model/pai/jihai";

describe(`TehaiWithTsumo`, () => {
  describe(`#parseMentsu`, () => {
    it(`should return mentsu`, () => {
      let tehai = new Tehai([
        new Souzu(1), new Souzu(2), new Souzu(2), new Souzu(3), new Souzu(4),
        new Manzu(1), new Manzu(1), new Manzu(1), new Manzu(2), new Manzu(2),
        new Manzu(2), new Manzu(2), new Manzu(3),
      ]);
      let tsumo = new Souzu(3);

      let tehaiWithTsumo = new TehaiWithTsumo(tehai, tsumo);
      let mentsu = tehaiWithTsumo.parseMentsu();

      assert(mentsu.shunts.length === 3);
      assert(mentsu.shunts[0].toString() === `[1萬,2萬,3萬]`);
      assert(mentsu.shunts[1].toString() === `[1索,2索,3索]`);
      assert(mentsu.shunts[2].toString() === `[2索,3索,4索]`);

      assert(mentsu.kotsus.length  === 1);
      assert(mentsu.kotsus[0].toString() === `[2萬,2萬,2萬]`);

      assert(mentsu.jantou.toString() === `[1萬,1萬]`);
    });
    it(`should throw exception if this is not completed format`, () => {
      let tehai = new Tehai([
        new Souzu(1), new Souzu(2), new Souzu(2), new Souzu(3), new Souzu(3),
        new Souzu(4),
        new Manzu(1), new Manzu(1), new Manzu(2), new Manzu(2), new Manzu(2),
        new Manzu(3), Jihai.Haku
      ]);
      let tsumo = Jihai.Haku;

      let tehaiWithTsumo = new TehaiWithTsumo(tehai, tsumo);
      assert.throws(() => {
        tehaiWithTsumo.parseMentsu();
      });
    });
  });
});
