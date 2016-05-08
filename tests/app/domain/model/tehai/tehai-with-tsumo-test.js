import assert from "power-assert";

import {TehaiWithTsumo, IMentsu} from "../../../../../dist/domain/model/tehai/tehai-with-tsumo";
import {Tehai} from "../../../../../dist/domain/model/tehai/tehai";
import {Pai}   from "../../../../../dist/domain/model/pai/pai";
import {Souzu} from "../../../../../dist/domain/model/pai/souzu";
import {Manzu} from "../../../../../dist/domain/model/pai/manzu";
import {Pinzu} from "../../../../../dist/domain/model/pai/pinzu";
import {Jihai} from "../../../../../dist/domain/model/pai/jihai";

describe(`TehaiWithTsumo`, () => {
  describe(`#parseMentsu`, () => {
    let dataProvider = [
      {
        tehai: new Tehai([
          new Souzu(1), new Souzu(2), new Souzu(2), new Souzu(3), new Souzu(4),
          new Manzu(1), new Manzu(1), new Manzu(1), new Manzu(2), new Manzu(2),
          new Manzu(2), new Manzu(2), new Manzu(3),
        ]),
        tsumo: new Souzu(3),
        mentsu: {
          shunts: [
            `[1萬,2萬,3萬]`,
            `[1索,2索,3索]`,
            `[2索,3索,4索]`
          ],
          kotsus: [
            `[2萬,2萬,2萬]`
          ],
          jantou: `[1萬,1萬]`
        }
      },
      {
        tehai: new Tehai([
          new Souzu(1), new Souzu(2), new Souzu(3),
          new Pinzu(6), new Pinzu(6), new Pinzu(6), new Pinzu(7), new Pinzu(8), new Pinzu(9),
          Jihai.HAKU, Jihai.HAKU, Jihai.HATSU, Jihai.HATSU
        ]),
        tsumo: Jihai.HAKU,
        mentsu: {
          shunts: [
            `[7筒,8筒,9筒]`,
            `[1索,2索,3索]`
          ],
          kotsus: [
            `[6筒,6筒,6筒]`,
            `[白,白,白]`
          ],
          jantou: `[發,發]`
        }
      },
      {
        tehai: new Tehai([
          new Souzu(1), new Souzu(1), new Souzu(1), new Souzu(2),
          new Souzu(3), new Souzu(4), new Souzu(5), new Souzu(6),
          new Souzu(7), new Souzu(8), new Souzu(9), new Souzu(9),
          new Souzu(9)
        ]),
        tsumo: new Souzu(2),
        mentsu: {
          shunts: [
            `[3索,4索,5索]`,
            `[6索,7索,8索]`
          ],
          kotsus: [
            `[1索,1索,1索]`,
            `[9索,9索,9索]`
          ],
          jantou: `[2索,2索]`
        }
      },
      {
        tehai: new Tehai([
          new Souzu(1), new Souzu(1), new Souzu(1), new Souzu(2),
          new Souzu(3), new Souzu(4), new Souzu(5), new Souzu(6),
          new Souzu(7), new Souzu(8), new Souzu(9), new Souzu(9),
          new Souzu(9)
        ]),
        tsumo: new Souzu(1),
        mentsu: {
          shunts: [
            `[1索,2索,3索]`,
            `[4索,5索,6索]`,
            `[7索,8索,9索]`
          ],
          kotsus: [
            `[1索,1索,1索]`,
          ],
          jantou: `[9索,9索]`
        }
      },
      {
        tehai: new Tehai([
          new Souzu(1), new Souzu(1), new Souzu(2), new Souzu(2),
          new Souzu(3), new Souzu(3), new Souzu(3), new Souzu(3),
          new Souzu(4), new Souzu(4), new Souzu(5), new Souzu(5),
          new Souzu(6)
        ]),
        tsumo: new Souzu(6),
        mentsu: {
          shunts: [
            `[1索,2索,3索]`,
            `[1索,2索,3索]`,
            `[4索,5索,6索]`,
            `[4索,5索,6索]`,
          ],
          kotsus: [],
          jantou: `[3索,3索]`
        }
      },
      {
        tehai: new Tehai([
          new Souzu(1), new Souzu(1), new Souzu(1),
          new Souzu(2), new Souzu(2), new Souzu(2),
          new Souzu(3), new Souzu(3), new Souzu(3),
          new Souzu(4), new Souzu(4), new Souzu(4),
          new Souzu(5),
        ]),
        tsumo: new Souzu(5),
        mentsu: {
          shunts: [
          ],
          kotsus: [
            `[1索,1索,1索]`,
            `[2索,2索,2索]`,
            `[3索,3索,3索]`,
            `[4索,4索,4索]`
          ],
          jantou: `[5索,5索]`
        }
      }
    ];
    dataProvider.forEach((data, index) => {
      it(`should return mentsu #${index}`, () => {
        let tehai = data.tehai
        let tsumo = data.tsumo
        let expectsMentsu = data.mentsu

        let tehaiWithTsumo = new TehaiWithTsumo(tehai, tsumo);
        let actualMentsu = tehaiWithTsumo.parseMentsu();

        assert(expectsMentsu.shunts.length === actualMentsu.shunts.length);
        assert(expectsMentsu.kotsus.length === actualMentsu.kotsus.length);

        expectsMentsu.shunts.forEach((expects, index) => {
          assert(expectsMentsu.shunts[index] === actualMentsu.shunts[index].toString());
        });
        expectsMentsu.kotsus.forEach((expects, index) => {
          assert(expectsMentsu.kotsus[index] === actualMentsu.kotsus[index].toString());
        });
        assert(expectsMentsu.jantou === actualMentsu.jantou.toString());
      });
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
