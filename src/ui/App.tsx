import * as React from 'react';

import { VmMock } from './vm-mock/VmMock';
import { Controls } from './controls/Controls';
import { InputCatcher, AbstractInputMatcher, getMatcher } from '../core';

interface AppState {
  clearSet: boolean;
}

export class App extends React.Component<any, AppState> {
  inputCatcher: InputCatcher;
  inputMatcher: AbstractInputMatcher;

  constructor(props: any) {
    super(props);
    this.inputCatcher = new InputCatcher();
    this.inputMatcher = getMatcher();
    this.state = { clearSet: false };
  }

  onClearSet() {
    // NOTE(Georgi): This simulates an impulse which tells VmMock to clear its contents.
    // This can be achieved with event emitting in InputCatcher but I didn't want to
    // pollute it since it will be only needed for the visualization part (demo).
    this.setState({ clearSet: true }, () => {
      this.setState({ clearSet: false });
    });
  }

  render() {
    return (
      <section>
        <VmMock inputCatcher={this.inputCatcher} clearSet={this.state.clearSet} />
        <Controls
          inputCatcher={this.inputCatcher}
          inputMatcher={this.inputMatcher}
          onClearSet={this.onClearSet.bind(this)} />
      </section>
    );
  }
}
