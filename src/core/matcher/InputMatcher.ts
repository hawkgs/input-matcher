import { InputSet } from '../InputTypes';

export abstract class AbstractInputMatcher {
  protected _sets: InputSet[];

  constructor(set?: InputSet) {
    this._sets = [];
    if (set) {
      this.addSet(set);
    }
  }

  addSet(set: InputSet) {
    this._sets.push(set);
  }

  abstract match(set: InputSet): number;
}

export class InputMatcher extends AbstractInputMatcher {
  match(set: InputSet) {
    return 0;
  }
}
