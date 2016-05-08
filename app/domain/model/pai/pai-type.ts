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

  toString() {
    return this.getName();
  }

  static MANZU = new PaiType('萬子', 1, 'm');
  static PINZU = new PaiType('筒子', 2, 'p');
  static SOUZU = new PaiType('索子', 3, 's');
  static JIHAI = new PaiType('字牌', 4);
}
