import * as React from 'react';
import './VmMock.css';

import { InputCatcher, InputSet, MouseClick, MouseMove, IMousePos, ClickType } from '../../core';

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

interface VmMockProps {
  inputCatcher: InputCatcher;
  clearSet: boolean;
}

interface VmMockState {
  clicks: Click[];
  moves: Move[];
}

export class VmMock extends React.Component<VmMockProps, VmMockState> {
  inputs: IMousePos[];
  private _ctx: CanvasRenderingContext2D;
  private _inputCatcher: InputCatcher;

  constructor(props: any) {
    super(props);

    this._generateInputPos();
    this._inputCatcher = this.props.inputCatcher;
    this.state = {
      clicks: [],
      moves: []
    };

    this.onKeyDown = this.onKeyDown.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  componentDidMount() {
    const canvas = document.getElementById('moves') as HTMLCanvasElement;
    this._ctx = canvas.getContext('2d');

    // NOTE: We are setting the specific target in order to avoid
    // wrong bounding rect when clicking on .move/.click/input
    this._inputCatcher.screen = document.querySelector('.vm-mock') as HTMLElement;
  }

  componentWillReceiveProps(props: VmMockProps) {
    if (props.clearSet) {
      this._clearVmMock();
    }
  }

  onMouseDown(ev: any) {
    this._inputCatcher.onMouseDown(ev);
  }

  onMouseMove(ev: any) {
    this._inputCatcher.onMouseMove(ev);
  }

  onMouseUp(ev: any) {
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

  onKeyDown(ev: any) {
    this._inputCatcher.onKeyDown(ev);
  }

  render() {
    return (
      <section
        style={vmSize}
        className="vm-mock"
        onContextMenu={e => e.preventDefault()}
        onKeyDown={this.onKeyDown}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}>
        { !!this.state.clicks.length &&
          this.state.clicks
            .map((c: Click, i: number) =>
              <div
                style={{ left: c.click.pos.x, top: c.click.pos.y, background: c.color }}
                className={'click' + (c.click.type === ClickType.Right ? ' right' : '')}
                data-idx={i}
                key={`c${i}`}
              />)
        }
        { !!this.state.moves.length &&
          this.state.moves
            .map((m: Move, idx: number) =>
              m.move.points.map((p: IMousePos, i: number) =>
                <div
                  style={{ left: p.x, top: p.y, background: m.color }}
                  className={'move' + (i === 0 ? ' first' : '')}
                  data-idx={idx}
                  key={`c${i}`}
                />))
        }
        {
          this.inputs.map((pos: IMousePos, i: number) =>
            <input type="text" style={{ left: pos.x, top: pos.y }} key={`i${i}`} />)
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

  private _generateInputPos() {
    const inputWidth = 184;
    this.inputs = [];

    for (let i = 0; i < 3; i++) {
      this.inputs.push({
        x: Math.floor(Math.random() * (VM_WIDTH - inputWidth)),
        y: Math.floor(Math.random() * VM_HEIGHT)
      });
    }
  }

  private _clearVmMock() {
    this._ctx.clearRect(0, 0, VM_WIDTH, VM_HEIGHT);
    this.setState({
      clicks: [],
      moves: []
    });

    const inputs = document.querySelectorAll('.vm-mock input');
    [].forEach.call(inputs, (i: any) => {
      i.value = '';
    });
  }
}
