import { parseSet } from './utils/Parser';

export abstract class InputAction {
  abstract toString(): string;
}

export enum ClickType {
  Left,
  Scroll,
  Right,
}

export interface IMousePos {
  x: number;
  y: number;
}

export interface IMouseClick {
  pos: IMousePos;
  type: ClickType
}

export interface IMouseMove {
  points: IMousePos[];
}

export interface IKeyPress {
  keyCode: number;
}

export class MouseClick extends InputAction implements IMouseClick {
  pos: IMousePos;
  type: ClickType;

  constructor(obj?: IMouseClick) {
    super();
    this.pos = obj.pos;
    this.type = obj.type;
  }

  toString(): string {
    return `c ${this.type} ${this.pos.x} ${this.pos.y}`;
  }
}

export class MouseMove extends InputAction implements IMouseMove {
  points: IMousePos[];

  constructor(obj?: IMouseMove) {
    super();
    this.points = obj.points || [];
  }

  addPoint(pos: IMousePos) {
    this.points.push(pos);
  }

  toString(): string {
    return `m ${this.points.map(p => `${p.x} ${p.y} `)}`;
  }
}

export class KeyPress extends InputAction implements IKeyPress {
  keyCode: number;

  constructor(obj?: IKeyPress) {
    super();
    this.keyCode = obj.keyCode;
  }

  toString(): string {
    return `k ${this.keyCode}`;
  }
}

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
    // NOTE(Georgi):  Making a deep copy. Relying on the parser here.
    return parseSet(this.toString());
  }

  toString(): string {
    return this.actions.map(a => `${a.toString()} `).join();
  }
}
