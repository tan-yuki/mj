import {TehaiWithTsumo, IMentsu} from "../../domain/model/tehai/tehai-with-tsumo";
import {Paiyama} from "../../domain/model/paiyama/paiyama";

export function tryTenho(): void {
  console.log(`== Try Tenho ==`);
  let tryCount = 0;
  let mentsu;
  while (true) {
    tryCount++;
    if (tryCount % 10000 === 0) {
      console.log(`Try ${tryCount}..`);
    }

    let tsumoWithTehai = createTehaiWithTsumo();
    try {
      mentsu = tsumoWithTehai.parseMentsu();
      break;
    } catch (e) {}
  }
  successTehho(tryCount, mentsu);
}

function createTehaiWithTsumo(): TehaiWithTsumo {
  let paiyama = Paiyama.initialize();
  let [tehais, remains] = paiyama.serveTehaiToPlayer(1);
  let [tsumo, _] = remains.tsumo();

  return new TehaiWithTsumo(tehais[0], tsumo);
}

function successTehho(tryCount:number, mentsu: IMentsu): void {
  let mentsString = '[' +
    mentsu.jantou.toString() + ',' +
    mentsu.shunts.map(function(pais) {
      return pais.toString();
    }).join(',') +
    mentsu.kotsus.map(function(pais) {
      return pais.toString();
    }).join(',') + ']';

  console.log(`[SUCCESS]:`);
  console.log(`  - Try count: ${tryCount}`);
  console.log(`  - Tehai: ${mentsString}`);
}
