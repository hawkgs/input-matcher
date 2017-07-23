import { InputSet, InputAction, MouseClick, MouseMove, KeySequence, EmptyAction } from '../InputTypes';
import { AbstractInputMatcher } from './AbstractInputMatcher';

interface OutputSet {
  coef: number;
  pos: number;
}

const ConstMap = {
  CLICK_RADIUS: 10,
  NEIGHBOR_RANGE: [-1, 1], // Don't change
  NEIGHBOR_COEF_RATE: 2
};

/**
 * Concrete implementation of the abstract input matcher.
 * It'll be most likely the default matching mechanism.
 *
 * @export
 * @class InputMatcher
 * @extends {AbstractInputMatcher}
 */
export class InputMatcher extends AbstractInputMatcher {
  match(input: InputSet) {
    return this._sets.map((training: InputSet) => {
      const is = input.copy();
      const ts = training.copy();
      this._equalizeLength(is, ts);
      const output: OutputSet[] = Array.apply(null, Array(is.actions.length))
        .map(String.prototype.valueOf, { coef: 0, pos: 0 });

      ts.actions.forEach((a: InputAction, i: number) => {
        const results: OutputSet[] = [];
        for (let nb = i + ConstMap.NEIGHBOR_RANGE[0]; nb <= ConstMap.NEIGHBOR_RANGE[1]; i += 1) {
          if (is.actions[nb]) {
            results.push({
              coef: this._compare(a, is.actions[nb]),
              pos: nb
            });
          }
        }

        const final = results.sort((u: OutputSet, v: OutputSet) => u.coef - v.coef).pop();

        // Magic; Maybe improve one day; Assumes NEIGHBOR_RANGE = [-1, 1]
        // If no conflict
        if (final.pos === 1 || (final.pos === 0 && (i === 0 || output[i - 1].pos === 0))) {
          output[i] = final;
        } else if (
          // If conflict
          (final.pos === 0 && output[i - 1].pos === 1 && output[i - 1].coef < final.coef) ||
          (final.pos === -1 && output[i - 1].pos === 0 && output[i - 1].coef < final.coef)) {
          output[i - 1] = { coef: 0, pos: 0 };
          output[i] = final;
        }
      });

      return output.map((o: OutputSet) => {
        if (o.pos === 0) {
          return o.coef;
        }
        const absI = Math.abs(o.pos);
        return o.coef * (absI * (1 / (absI * ConstMap.NEIGHBOR_COEF_RATE)));
      }).reduce((a: number, b: number) => a + b) / output.length;
    }).reduce((a: number, b: number) => a + b) / this._sets.length;
  }

  private _equalizeLength(a: InputSet, b: InputSet): void {
    const diff = Math.abs(a.actions.length - b.actions.length);
    const filled = a.actions.length > b.actions.length ? b : a;

    for (let i = 0; i < diff; i += 1) {
      filled.add(new EmptyAction());
    }
  }

  private _compare(t: InputAction, i: InputAction): number {
    if (t instanceof MouseClick && i instanceof MouseClick) {
      return this._compareClicks(t, i);
    } else if (t instanceof MouseMove && i instanceof MouseMove) {
      return this._compareMoves(t, i);
    } else if (t instanceof KeySequence && i instanceof KeySequence) {
      return this._compareKeySequences(t, i);
    }

    return 0;
  }

  private _compareClicks(t: MouseClick, i: MouseClick): number {
    if (t.type !== i.type) {
      return 0;
    }
    // algorithm
    return 0;
  }

  private _compareMoves(t: MouseMove, i: MouseMove): number {
    // algorithm
    return 0;
  }

  private _compareKeySequences(t: KeySequence, i: KeySequence): number {
    // algorithm
    return 0;
  }
}
