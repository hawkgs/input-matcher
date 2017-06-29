import { InputSet } from '../InputTypes';
import { AbstractInputMatcher } from './AbstractInputMatcher';

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
    return 0;
  }
}
