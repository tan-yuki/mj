import {Pai}         from "../pai/pai";
import {Tehai}      from "../tehai/tehai";
import {PlayerState} from "./player-state";

export class Player {
  private tsumoPai: Pai;
  private state: PlayerState;

  constructor(private tehai: Tehai) {
  }

  /**
   * 配牌とツモ配を返す
   * ツモ配がない状態の場合はPai型にはnullが入る
   *
   * @return [Tehai, Pai]
   */
  getTehai(): [Tehai, Pai] {
    return [this.tehai, this.tsumoPai];
  }

  /**
   * 配を一つツモる
   * 配を捨てる前にもう一度ツモをした場合は例外を投げる
   */
  tsumo(pai: Pai): void {
    console.assert(!this.tsumoPai, '2回ツモを実行しました');
    this.tsumoPai = pai;
  }

  /**
   * 指定したindexの場所にある配を捨て、ツモ配と交換する
   *
   * @param index
   */
  discard(index: number): Tehai {
    let pais = this.tehai
      .deleteAt(index)
      .add(this.tsumoPai)
      .toArray();

    return new Tehai(pais);
  }

  /**
   * ツモ切り
   */
  tsumogiri(): void {
    this.tsumoPai = null;
  }
}
