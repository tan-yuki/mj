export class PaiType {
  constructor(private name:string,
              private sortIndex:number,
              private nameSuffix:string = '') {
  }

  getName() {
    return this.name;
  }

  getSortIndex() {
    return this.sortIndex;
  }

  getNameSuffix() {
    return this.nameSuffix;
  }

  static MANZU = new PaiType('萬子', 1, '萬');
  static PINZU = new PaiType('筒子', 2, '筒');
  static SOUZU = new PaiType('索子', 3, '索');
  static JIHAI = new PaiType('字牌', 4);
}
