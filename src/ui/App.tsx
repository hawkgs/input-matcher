import * as React from 'react';

import { VmMock } from './vm-mock/VmMock';
import { Controls } from './controls/Controls';
import { InputCatcher } from '../core/InputCatcher';
import { AbstractInputMatcher, InputMatcher } from '../core/matcher/InputMatcher';

export class App extends React.Component<any, null> {
  inputCatcher: InputCatcher;
  inputMatcher: AbstractInputMatcher;

  constructor(props: any) {
    super(props);
    this.inputCatcher = new InputCatcher();
    this.inputMatcher = new InputMatcher();
  }

  render() {
    return (
      <section>
        <VmMock inputCatcher={this.inputCatcher} />
        <Controls inputCatcher={this.inputCatcher} inputMatcher={this.inputMatcher} />
      </section>
    );
  }
}
