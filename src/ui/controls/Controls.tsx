import * as React from 'react';
import './Controls.css';

import { InputCatcher } from '../../core/InputCatcher';
import { AbstractInputMatcher } from '../../core/matcher/InputMatcher';
import { InputSet } from '../../core/InputTypes';

interface ControlsProps {
  inputCatcher: InputCatcher;
  inputMatcher: AbstractInputMatcher;
  onClearSet: () => void;
}

export class Controls extends React.Component<ControlsProps, null> {
  constructor(props: ControlsProps) {
    super(props);

    this.clearSet = this.clearSet.bind(this);
    this.addToTrainingSet = this.addToTrainingSet.bind(this);
    this.printTrainingSets = this.printTrainingSets.bind(this);
  }

  addToTrainingSet() {
    const set = this.props.inputCatcher.set;

    this.props.inputMatcher.addSet(set);
    this.clearSet();
  }

  clearSet() {
    this.props.inputCatcher.clearSet();
    this.props.onClearSet();
  }

  printTrainingSets() {
    this.props.inputMatcher.sets.forEach((set: InputSet) => console.log(set));
  }

  render() {
    return (
      <section>
        <button onClick={this.clearSet}>Clear</button>
        <button onClick={this.addToTrainingSet}>Add to training set</button>
        <button onClick={this.printTrainingSets}>Print sets</button>
      </section>
    );
  }
}
