import { parseSet } from './utils/Parser';

/**
 * InputAction is the parent of all types of actions - key presses, clicks, etc.
 *
 * @export
 * @abstract
 * @class InputAction
 */
export abstract class InputAction {
  abstract toString(): string;
}

/**
 * ClickType represents all types of user mouse clicks.
 *
 * @export
 * @enum {number}
 */
export enum ClickType {
  Left,
  Scroll,
  Right,
}

/**
 * IMousePos describes a mouse position with X and Y.
 *
 * @export
 * @interface IMousePos
 */
export interface IMousePos {
  x: number;
  y: number;
}

/**
 * IMouseClick describes a mouse click with position and click type.
 *
 * @export
 * @interface IMouseClick
 */
export interface IMouseClick {
  pos: IMousePos;
  type: ClickType
}


/**
 * IMouseMove describes a movement/dragging which is represented with set of mouse clicks.
 *
 * @export
 * @interface IMouseMove
 */
export interface IMouseMove {
  points: IMousePos[];
}


/**
 * IKeySequence describes a sequence of key presses.
 *
 * @export
 * @interface IKeySequence
 */
export interface IKeySequence {
  keyCodes: number[];
}

/**
 * MouseClick is an InputAction that represents a mouse click.
 * Every click has position (`IMousePos`) and type (`IClickType`)
 *
 * @export
 * @class MouseClick
 * @extends {InputAction}
 * @implements {IMouseClick}
 */
export class MouseClick extends InputAction implements IMouseClick {
  pos: IMousePos;
  type: ClickType;

  constructor(obj?: IMouseClick) {
    super();

    if (obj) {
      this.pos = obj.pos;
      this.type = obj.type;
    }
  }

  toString(): string {
    return `c ${this.type} ${this.pos.x} ${this.pos.y}`;
  }
}

/**
 * MouseMove is an InputAction that represents a mouse movement.
 * It is basically a set of `IMousePos`.
 *
 * @export
 * @class MouseMove
 * @extends {InputAction}
 * @implements {IMouseMove}
 */
export class MouseMove extends InputAction implements IMouseMove {
  points: IMousePos[];

  constructor(obj?: IMouseMove) {
    super();
    this.points = obj ? (obj.points || []) : [];
  }

  addPoint(pos: IMousePos) {
    this.points.push(pos);
  }

  toString(): string {
    return `m ${this.points.map(p => `${p.x} ${p.y}`).join(' ')}`;
  }
}

/**
 * KeySequence is an InputAction that represents a sequence of key presses.
 * It has a `keyCodes` (`number[]`).
 *
 * @export
 * @class KeySequence
 * @extends {InputAction}
 * @implements {IKeySequence}
 */
export class KeySequence extends InputAction implements IKeySequence {
  keyCodes: number[];

  constructor(obj?: IKeySequence) {
    super();
    this.keyCodes = obj ? (obj.keyCodes || []) : [];
  }

  addKey(code: number) {
    this.keyCodes.push(code);
  }

  toString(): string {
    return `k ${this.keyCodes.join(' ')}`;
  }
}

/**
 * InputSet is a container for `InputAction`-s. It provides some basic operations over the set.
 *
 * @export
 * @class InputSet
 */
export class InputSet {
  actions: InputAction[];

  constructor(actions?: InputAction[]) {
    if (actions) {
      this.actions = actions;
    }
    this.actions = [];
  }

  add(action: InputAction) {
    console.log(action);
    this.actions.push(action);
  }

  normalize(maxX: number, maxY: number) {
    this.actions.forEach((a: InputAction) => {
      if (a instanceof MouseClick) {
        a.pos.x /= maxX;
        a.pos.y /= maxY;
      } else if (a instanceof MouseMove) {
        a.points.forEach((p: IMousePos) => {
          p.x /= maxX;
          p.y /= maxY;
        });
      }
    });
  }

  clear() {
    this.actions = [];
  }

  copy(): InputSet {
    // NOTE(Georgi): Making a deep copy. Relying on the parser here.
    return parseSet(this.toString());
  }

  toString(): string {
    return this.actions.map(a => a.toString()).join(' ');
  }
}
