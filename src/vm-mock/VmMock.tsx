import * as React from 'react';
import './VmMock.css';

import { InputCatcher } from '../core/InputCatcher';
import { InputSet, MouseClick, MouseMove, IMousePos } from '../core/InputTypes';

const VM_WIDTH = 1024;
const VM_HEIGHT = 780;

const vmSize = {
  width: VM_WIDTH,
  height: VM_HEIGHT
};

interface Click {
  click: MouseClick;
  color: string;
}

interface Move {
  move: MouseMove;
  color: string;
}

interface VmMockState {
  clicks: Click[];
  moves: Move[];
}

export class VmMock extends React.Component<any, VmMockState> {
  private _ctx: CanvasRenderingContext2D;
  private _inputCatcher: InputCatcher;

  constructor(props: any) {
    super(props);
    this._inputCatcher = new InputCatcher();
    this.state = {
      clicks: [],
      moves: []
    };
  }

  componentDidMount() {
    const canvas = document.getElementById('moves') as HTMLCanvasElement;
    this._ctx = canvas.getContext('2d');
  }

  onMouseDown(ev: MouseEvent) {
    this._inputCatcher.onMouseDown(ev);
  }

  onMouseMove(ev: MouseEvent) {
    this._inputCatcher.onMouseMove(ev);
  }

  onMouseUp(ev: MouseEvent) {
    const action = this._inputCatcher.onMouseUp(ev);
    const color = this._generateRgbColor();

    if (action instanceof MouseMove) {
      const moves = this.state.moves.slice();
      const move = { move: action, color };
      moves.push(move);
      this.setState({ moves });
      this._renderMoveInCanvas(move);
    } else if (action instanceof MouseClick) {
      const clicks = this.state.clicks.slice();
      clicks.push({ click: action, color });
      this.setState({ clicks });
    }
  }

  render() {
    return (
      <section
        style={vmSize}
        className="vm-mock"
        onMouseDown={this.onMouseDown.bind(this)}
        onMouseMove={this.onMouseMove.bind(this)}
        onMouseUp={this.onMouseUp.bind(this)}>
        { !!this.state.clicks.length &&
          this.state.clicks
            .map((c: Click, i: number) =>
              <div
                style={{ left: c.click.pos.x, top: c.click.pos.y, background: c.color }}
                className="click"
                data-idx={i}
                key={`c${i}`} />)
        }
        { !!this.state.moves.length &&
          this.state.moves
            .map((m: Move, idx: number) =>
              m.move.points.map((p: IMousePos, i: number) =>
                <div
                  style={{ left: p.x, top: p.y, background: m.color }}
                  className={'move' + (i === 0 ? ' first' : '')}
                  data-idx={idx}
                  key={`c${i}`} />))
        }
        <canvas id="moves" width={VM_WIDTH} height={VM_HEIGHT} />
      </section>
    );
  }

  private _generateRgbColor(): string {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);

    return `rgb(${r}, ${g}, ${b})`;
  }

  private _renderMoveInCanvas(m: Move) {
    m.move.points.forEach((p: IMousePos, i: number) => {
      if (i === 0) {
        this._ctx.beginPath();
        this._ctx.moveTo(p.x, p.y);
      } else if (i > 0) {
        this._ctx.lineTo(p.x, p.y);
      }

      if (i === m.move.points.length - 1) {
        this._ctx.strokeStyle = m.color;
        this._ctx.stroke();
      }
    });
  }
}
