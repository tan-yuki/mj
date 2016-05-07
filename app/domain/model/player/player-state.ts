export interface IPlayerState {
  isParent: boolean;
  reached: boolean;
}

export class PlayerState {
  constructor(private isParent: boolean,
              private reached: boolean) {
  }

  toParent(): PlayerState {
    let s = PlayerState.initialize();
    s.setParent(true);

    return s;
  }

  toReached(): PlayerState {
    let s = PlayerState.initialize();
    s.setReached(true);

    return s;
  }

  static initialize(): PlayerState {
    return new PlayerState(false, false);
  }

  private setParent(p: boolean) {
    this.isParent = p;
  }

  private setReached(r: boolean) {
    this.reached = r;
  }
}
