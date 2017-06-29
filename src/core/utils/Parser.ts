import { InputSet, InputAction, MouseClick, MouseMove, KeyPress, IMousePos } from '../InputTypes';

/**
 * Some sort of a factory that returns an `InputAction` instance based on a provided letter.
 */
const letterToType: any = {
  c: () => new MouseClick(),
  m: () => new MouseMove(),
  k: () => new KeyPress()
}

/**
 * An object with parser functions for each type of action.
 */
const parsers: any = {
  MouseClick: (a: MouseClick, n: number, i: number) => {
    switch (i) {
      case 0:
        a.type = n;
        break;
      case 1:
        a.pos = { x: n, y: -1 };
        break;
      case 2:
        a.pos.y = n;
        break;
    }
  },

  MouseMove: (a: MouseMove, n: number, i: number) => {
    if (i % 2 === 0) {
      a.addPoint({ x: n, y: -1 });
    } else {
      a.points[a.points.length - 1].y = n;
    }
  },

  KeyPress: (a: KeyPress, n: number) => {
    a.keyCode = n;
  }
};

/**
 * Stringifies an `InputSet`.
 * @param set
 */
export const stringifySet = (set: InputSet): string => {
  return set.toString();
};

/**
 * Creates an `InputSet` by the provided formatted string.
 * @param str
 */
export const parseSet = (str: string): InputSet => {
  const set = new InputSet();
  const data = str.split(' ');
  let action: InputAction;
  let valSeq: number;

  data.forEach((v: string, idx: number) => {
    const parsed = parseFloat(v);

    if (isNaN(parsed) && !!letterToType[v]) {
      if (action) {
        set.add(action);
      }
      valSeq = 0;
      action = letterToType[v]();
    } else if (!isNaN(parsed)) {
      const instance = (action.constructor as any).name;
      const parser = parsers[instance];

      if (!parser) {
        throw new Error(`There is not provided parser for ${instance}`);
      }

      parser(action, parsed, valSeq);
      valSeq++;
    } else {
      throw new Error(`There is not such type of action "${v}"`);
    }

    if (idx === data.length - 1) {
      set.add(action);
    }
  });

  return set;
};
