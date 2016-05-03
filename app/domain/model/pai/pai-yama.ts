/// <reference path="../../../../typings/main.d.ts" />
import * as lodash from "lodash";

import {PaiCollection} from "./pai-collection";
import {Pai} from "./pai";
import {Manzu} from "./manzu";
import {Pinzu} from "./pinzu";
import {Souzu} from "./souzu";

export class PaiYama extends PaiCollection {

  constructor() {
    let pais = [
      // manzu
      new Manzu(1), new Manzu(2), new Manzu(3), new Manzu(4), new Manzu(5),
      new Manzu(6), new Manzu(7), new Manzu(8), new Manzu(9),
      // pinzu
      new Pinzu(1), new Pinzu(2), new Pinzu(3), new Pinzu(4), new Pinzu(5),
      new Pinzu(6), new Pinzu(7), new Pinzu(8), new Pinzu(9),
      // souzu
      new Souzu(1), new Souzu(2), new Souzu(3), new Souzu(4), new Souzu(5),
      new Souzu(6), new Souzu(7), new Souzu(8), new Souzu(9)
    ];

    super(lodash.flatMap(Array(4), () => pais));
  }

  newInstance(entities: Array<Pai>): PaiYama {
    return new PaiYama();
  }
}
