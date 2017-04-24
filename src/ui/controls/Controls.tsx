import * as React from 'react';
import './Controls.css';

import { InputCatcher } from '../../core/InputCatcher';
import { AbstractInputMatcher } from '../../core/matcher/InputMatcher';

interface ControlsProps {
  inputCatcher: InputCatcher;
  inputMatcher: AbstractInputMatcher;
}

export class Controls extends React.Component<ControlsProps, null> {
  addToTrainingSet() {
    const set = this.props.inputCatcher.set;
    this.props.inputMatcher.addSet(set);
    this.props.inputCatcher.clearSet();
  }

  render() {
    return (
      <section>
        <button onClick={this.addToTrainingSet.bind(this)}>Add to training set</button>
      </section>
    );
  }
}
