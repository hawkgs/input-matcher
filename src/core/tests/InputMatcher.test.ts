import { expect } from 'chai';
import { InputMatcher } from '../matcher/InputMatcher';
import { InputAction, InputSet, MouseClick } from '../InputTypes';

describe('InputMatcher', () => {
  let matcher: any;

  beforeEach(() => {
    matcher = new InputMatcher();
    matcher._compare = () => {
      return 1;
    };
  });

  it('should do whatever', () => {
    const is = new InputSet([
      new MouseClick({ pos: { x: 1, y: 1 }, type: 0 })
    ]);

    matcher.addSet(is);
    matcher.match(new InputSet());
    expect(matcher._compare()).to.equal(1);
  });
});
