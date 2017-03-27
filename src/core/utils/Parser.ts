import { InputSet, InputAction, MouseClick, MouseMove, KeyPress, IMousePos } from '../InputTypes';

const letterToType: any = {
  c: () => new MouseClick(),
  m: () => new MouseMove(),
  k: () => new KeyPress()
}

const parsers: any = {
  MouseClick: (a: MouseClick, n: number, i: number) => {
    switch (i) {
      case 0:
        a.type = i;
        break;
      case 1:
        a.pos = { x: i, y: -1 };
        break;
      case 2:
        a.pos.y = i;
        break;
    }
  },

  MouseMove: (a: MouseMove, n: number, i: number) => {
    if (i % 2 === 0) {
      a.addPoint({ x: i, y: -1 });
    } else {
      a.points[a.points.length - 1].y = i;
    }
  },

  KeyPress: (a: KeyPress, n: number) => {
    a.keyCode = n;
  }
};

// Just for convenience
export const stringifySet = (set: InputSet): string => {
  return set.toString();
};

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
