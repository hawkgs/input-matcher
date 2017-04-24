import * as React from 'react';
import './Controls.css';

import { InputCatcher } from '../../core/InputCatcher';
import { AbstractInputMatcher } from '../../core/matcher/InputMatcher';

interface ControlsProps {
  inputCatcher: InputCatcher;
  inputMatcher: AbstractInputMatcher;
  onClearSet: () => void;
}

export class Controls extends React.Component<ControlsProps, null> {
  addToTrainingSet() {
    const set = this.props.inputCatcher.set;
    this.props.inputMatcher.addSet(set);
    this.clearSet();
  }

  clearSet() {
    this.props.inputCatcher.clearSet();
    this.props.onClearSet();
  }

  render() {
    return (
      <section>
        <button onClick={this.clearSet.bind(this)}>Clear</button>
        <button onClick={this.addToTrainingSet.bind(this)}>Add to training set</button>
      </section>
    );
  }
}
