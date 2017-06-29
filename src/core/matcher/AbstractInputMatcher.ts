import { InputSet } from '../InputTypes';

/**
 * AbstractInputMatcher defines the properties and behavior of a matcher.
 *
 * @export
 * @abstract
 * @class AbstractInputMatcher
 */
export abstract class AbstractInputMatcher {
  protected _sets: InputSet[];

  constructor(set?: InputSet) {
    this._sets = [];
    if (set) {
      this.addSet(set);
    }
  }

  get sets(): InputSet[] {
    return this._sets;
  }

  addSet(set: InputSet) {
    this._sets.push(set);
  }

  abstract match(set: InputSet): number;
}
