import { InputSet, InputAction, MouseClick, MouseMove, KeySequence } from '../InputTypes';
import { AbstractInputMatcher } from './AbstractInputMatcher';

interface OutputSet {
  coef: number;
  idx: number;
}

const CLICK_RADIUS = 10;

/**
 * Concrete implementation of the abstract input matcher.
 * It'll be most likely the default matching mechanism.
 *
 * @export
 * @class InputMatcher
 * @extends {AbstractInputMatcher}
 */
export class InputMatcher extends AbstractInputMatcher {
  match(set: InputSet) {
    return this._sets.map((s: InputSet) => {
      const output: OutputSet[] = [];

      s.actions.forEach((a: InputAction, i: number) => {

      });

      return 0;
    }).reduce((a: number, b: number) => a + b) / this._sets.length;
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

  private _compareKeySequences(t: KeySequence, i: KeySequence) {
    // algorithm
    return 0;
  }
}
