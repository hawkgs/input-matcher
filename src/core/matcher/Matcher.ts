import { AbstractInputMatcher } from './AbstractInputMatcher';
import { InputMatcher } from './InputMatcher';

/**
 * Provides an instance of the concrete input matcher accross the app.
 */
export const getMatcher = () => {
  return new InputMatcher();
};
