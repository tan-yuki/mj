// import {AbstractCollection} from "../../../util/collection/abstract-collection";
// import {Pai} from "../pai/pai";
// import {PaiCollection} from "../pai/pai-collection";
// 
// export class TehaiWithTsumo {
// 
//   constructor(private tehai: Tehai,
//               private tsumo: Pai) {
//   }
// 
//   /**
//    * 飜数と符数を計算する
//    * 第一要素が飜数、第二要素が符数
//    *
//    * @return [number, number]
//    */
//   calcFanAndFu(): boolean {
//     let collection = this.getSortedPaiCollection();
//     // collection.filter
//   }
// 
//   private parseMentsu(collection: PaiCollection) {
//     let pais = collection.getEntities();
//     let p = pais[0];
//   }
// 
// 
//   /**
//    * ツモ後の手牌をリーパイした後の配のリストを返す
//    *
//    * @return PaiCollection
//    */
//   private getSortedPaiCollection(): PaiCollection {
//     let pais = this.tehai.getEntities();
//     pais.push(this.tsumo);
//     let collection = new PaiCollection(pais);
// 
//     return collection.riipai();
//   }
// 
//   /**
//    * 和了かどうかを判定する
//    */
//   private isHora(): boolean {
//     return false;
//   }
// 
//   /**
//    * 七対子かどうかを判定する
//    */
//   private isChitoitsu(): boolean {
//     return false;
//   }
// 
//   private isYakuman(): boolean {
//     return false;
//   }
// 
// }
