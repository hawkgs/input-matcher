import {
  InputAction, InputSet, MouseMove, MouseClick, KeyPress,
  IMousePos, IMouseMove, IMouseClick
} from './InputTypes';

const MOVE_LIMIT = 20;

export class InputCatcher {
  private _mouseDown: boolean;
  private _mouseMove: boolean;
  private _moveCt: number;
  private _currMove: IMouseMove;
  private _set: InputSet;

  constructor() {
    this._set = new InputSet();
  }

  onMouseDown(ev: MouseEvent) {
    this._mouseDown = true;
    this._currMove = { points: [this._getMouseCoordinates(ev)] };
  }

  onMouseMove(ev: MouseEvent) {
    if (this._mouseDown) {
      this._mouseMove = true;
      this._moveCt++;

      if (this._moveCt >= MOVE_LIMIT) {
        this._moveCt = 0;
        this._currMove.points.push(this._getMouseCoordinates(ev));
      }
    }
  }

  onMouseUp(ev: MouseEvent) {
    this._mouseDown = false;
    const pos = this._getMouseCoordinates(ev);
    let action: InputAction;

    if (this._mouseMove) {
      this._mouseMove = false;
      this._currMove.points.push(pos);
      action = new MouseMove(this._currMove);
    } else {
      // TODO: recognize mouse click
      action = new MouseClick({
        pos, type: 1
      })
    }

    this._set.add(action);
  }

  onKeyDown(ev: KeyboardEvent) {
    const action = new KeyPress({ keyCode: ev.keyCode })
    this._set.add(action);
  }

  private _getMouseCoordinates(ev: MouseEvent): IMousePos {
    const elemRect = (ev.target as any).getBoundingClientRect();
    const x = ev.clientX - elemRect.left;
    const y = ev.clientY - elemRect.top;
    return { x, y };
  }
}
