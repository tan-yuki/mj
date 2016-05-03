export class PaiType {
  constructor(private sortIndex:number,
             private nameSuffix:string = '') {
  }

  getSortIndex() {
    return this.sortIndex;
  }

  getNameSuffix() {
    return this.nameSuffix;
  }

  static MANZU = new PaiType(1, '萬');
  static PINZU = new PaiType(2, '筒');
  static SOUZU = new PaiType(3, '索');
  static JIHAI = new PaiType(4);
}
