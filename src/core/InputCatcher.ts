import {
  InputAction, InputSet, MouseMove, MouseClick, KeySequence,
  IMousePos, IMouseMove, IMouseClick, IKeySequence
} from './InputTypes';

/**
 * It represents after how many mouse movements should a point be registered in the `MouseMove` object.
 * The smaller, the better drawing we get.
 */
const MOVE_LIMIT = 20;

/**
 * InputCatcher provides a set of DOM events that can be attached to an element.
 * All the input (clicks, moves, etc) in element will be then recorded or captured
 * in the `InputSet`.
 *
 * @export
 * @class InputCatcher
 */
export class InputCatcher {
  private _mouseDown: boolean;
  private _mouseMove: boolean;
  private _moveCt: number;
  private _currMove: IMouseMove;
  private _currKeySeq: IKeySequence;
  private _set: InputSet;
  private _screen: HTMLElement;

  constructor() {
    this._moveCt = 0;
    this._set = new InputSet();
  }

  get set(): InputSet {
    return this._set.copy();
  }

  set screen(val: HTMLElement) {
    this._screen = val;
  }

  onMouseDown(ev: MouseEvent) {
    this._closeKeySequence();
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

  onMouseUp(ev: MouseEvent): InputAction {
    this._mouseDown = false;
    const pos = this._getMouseCoordinates(ev);
    let action: InputAction;

    if (this._mouseMove) {
      this._mouseMove = false;
      this._currMove.points.push(pos);
      action = new MouseMove(this._currMove);
    } else {
      action = new MouseClick({
        pos, type: ev.button
      })
    }

    this._set.add(action);
    return action;
  }

  onKeyDown(ev: KeyboardEvent) {
    if (this._currKeySeq) {
      this._currKeySeq.keyCodes.push(ev.keyCode);
    } else {
      this._currKeySeq = { keyCodes: [ev.keyCode] };
    }
  }

  clearSet() {
    this._set.clear();
  }

  private _closeKeySequence() {
    if (this._currKeySeq) {
      const action = new KeySequence(this._currKeySeq)
      this._set.add(action);
      this._currKeySeq = null;
    }
  }

  private _getMouseCoordinates(ev: MouseEvent): IMousePos {
    // NOTE(Georgi): This might be useless when in use along with _screen
    let elemRect: any;
    if (!this._screen) {
      elemRect = (ev.target as any).getBoundingClientRect();
    } else {
      elemRect = this._screen.getBoundingClientRect();
    }

    const x = ev.clientX - elemRect.left;
    const y = ev.clientY - elemRect.top;
    return { x, y };
  }
}
