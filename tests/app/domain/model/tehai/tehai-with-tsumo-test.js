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
            `[1m,2m,3m]`,
            `[1s,2s,3s]`,
            `[2s,3s,4s]`
          ],
          kotsus: [
            `[2m,2m,2m]`
          ],
          jantou: `[1m,1m]`
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
            `[7p,8p,9p]`,
            `[1s,2s,3s]`
          ],
          kotsus: [
            `[6p,6p,6p]`,
            `[haku,haku,haku]`
          ],
          jantou: `[hatsu,hatsu]`
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
            `[3s,4s,5s]`,
            `[6s,7s,8s]`
          ],
          kotsus: [
            `[1s,1s,1s]`,
            `[9s,9s,9s]`
          ],
          jantou: `[2s,2s]`
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
            `[1s,2s,3s]`,
            `[4s,5s,6s]`,
            `[7s,8s,9s]`
          ],
          kotsus: [
            `[1s,1s,1s]`,
          ],
          jantou: `[9s,9s]`
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
            `[1s,2s,3s]`,
            `[1s,2s,3s]`,
            `[4s,5s,6s]`,
            `[4s,5s,6s]`,
          ],
          kotsus: [],
          jantou: `[3s,3s]`
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
            `[1s,1s,1s]`,
            `[2s,2s,2s]`,
            `[3s,3s,3s]`,
            `[4s,4s,4s]`
          ],
          jantou: `[5s,5s]`
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
