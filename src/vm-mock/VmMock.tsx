import * as React from 'react';
import './VmMock.css';

const VM_WIDTH = 1024;
const VM_HEIGHT = 780;

const vmSize = {
  width: VM_WIDTH,
  height: VM_HEIGHT
};

interface MousePos {
  x: number;
  y: number;
}

interface Click {
  pos: MousePos;
  color: string;
}

interface VmMockState {
  clicks: Click[];
}

export class VmMock extends React.Component<any, VmMockState> {
  constructor(props: any) {
    super(props);
    this.state = { clicks: [] };
  }

  registerClick(ev: MouseEvent) {
    const pos = this._getCoordinates(ev);
    const color = this._generateRgbColor();
    const clicks = this.state.clicks.slice();

    clicks.push({ pos, color });
    this.setState({ clicks });
  }

  render() {
    return (
      <section style={vmSize} className="vm-mock" onClick={this.registerClick.bind(this)}>
        {
          this.state.clicks
            .map((c: Click, i: number) =>
              <div
                style={{ left: c.pos.x, top: c.pos.y, background: c.color }}
                className="click"
                data-idx={i}
                key={`c${i}`} />)
        }
      </section>
    );
  }

  private _getCoordinates(ev: MouseEvent): MousePos {
    const elemRect = (ev.target as any).getBoundingClientRect();
    const x = ev.clientX - elemRect.left;
    const y = ev.clientY - elemRect.top;
    return { x, y };
  }

  private _generateRgbColor(): string {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);

    return `rgb(${r}, ${g}, ${b})`;
  }
}
