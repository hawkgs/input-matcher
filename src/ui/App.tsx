import * as React from 'react';
import { VmMock } from './vm-mock/VmMock';

export class App extends React.Component<null, null> {
  render() {
    return <VmMock />;
  }
}
