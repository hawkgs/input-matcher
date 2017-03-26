export interface IMousePos {
  x: number;
  y: number;
}

export interface IMouseMove {
  points: IMousePos[];
}

export class InputCatcher {
  private _mouseDown: boolean;
  private _mouseMove: boolean;
  private _moveCt: number;
  private _currMove: MouseMove;

  onMouseUp(ev: MouseEvent) {

  }

  onMouseMove(ev: MouseEvent) {

  }

  onMouseDown(ev: MouseEvent) {

  }
}
