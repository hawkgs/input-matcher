export abstract class InputAction {}

export enum ClickType {
  Left,
  Right,
  Scroll
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

  constructor(obj: IMouseClick) {
    super();
    this.pos = obj.pos;
    this.type = obj.type;
  }
}

export class MouseMove extends InputAction implements IMouseMove {
  points: IMousePos[];

  constructor(obj: IMouseMove) {
    super();
    this.points = obj.points;
  }

  addPoint(pos: IMousePos) {
    this.points.push(pos);
  }
}

export class KeyPress extends InputAction implements IKeyPress {
  keyCode: number;

  constructor(obj: IKeyPress) {
    super();
    this.keyCode = obj.keyCode;
  }
}

export class InputSet {
  actions: InputAction[];

  constructor() {
    this.actions = [];
  }

  add(action: InputAction) {
    console.log(action);
    this.actions.push(action);
  }
}
