import * as React from 'react';
import './VmMock.css';

const VM_WIDTH = 1024;
const VM_HEIGHT = 780;
const MOVE_LIMIT = 20;

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

interface MouseMove {
  points: MousePos[];
  color: string;
}

interface VmMockState {
  clicks: Click[];
  moves: MouseMove[];
}

export class VmMock extends React.Component<any, VmMockState> {
  private _mouseDown: boolean;
  private _mouseMove: boolean;
  private _moveCt: number;
  private _currMove: MouseMove;
  private _ctx: CanvasRenderingContext2D;

  constructor(props: any) {
    super(props);
    this._moveCt = 0;
    this.state = { clicks: [], moves: [] };
  }

  onMouseDown(ev: MouseEvent) {
    this._mouseDown = true;
    this._currMove = {
      points: [this._getCoordinates(ev)],
      color: this._generateRgbColor()
    };
  }

  onMouseMove(ev: MouseEvent) {
    if (this._mouseDown) {
      this._mouseMove = true;
      this._moveCt++;

      if (this._moveCt >= MOVE_LIMIT) {
        this._moveCt = 0;
        this._currMove.points.push(this._getCoordinates(ev));
      }
    }
  }

  onMouseUp(ev: MouseEvent) {
    this._mouseDown = false;

    if (this._mouseMove) {
      this._mouseMove = false;
      this._currMove.points.push(this._getCoordinates(ev));

      const moves = this.state.moves.slice();
      moves.push(this._currMove);
      this.setState({ moves });
      this._renderMoveInCanvas(this._currMove);
    } else {
      this._registerClick(ev);
    }
  }

  componentDidMount() {
    const canvas = document.getElementById('moves') as HTMLCanvasElement;
    this._ctx = canvas.getContext('2d');
    // this._ctx.beginPath();
    // this._ctx.moveTo(20, 20);
    // this._ctx.lineTo(20, 100);
    // this._ctx.lineTo(70, 100);
    // this._ctx.stroke();
  }

  render() {
    return (
      <section
        style={vmSize}
        className="vm-mock"
        onMouseDown={this.onMouseDown.bind(this)}
        onMouseMove={this.onMouseMove.bind(this)}
        onMouseUp={this.onMouseUp.bind(this)}>
        {
          this.state.clicks
            .map((c: Click, i: number) =>
              <div
                style={{ left: c.pos.x, top: c.pos.y, background: c.color }}
                className="click"
                data-idx={i}
                key={`c${i}`} />)
        }
        {
          this.state.moves
            .map((m: MouseMove, idx: number) =>
              m.points.map((p: MousePos, i: number) =>
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

  private _registerClick(ev: MouseEvent) {
    const pos = this._getCoordinates(ev);
    const color = this._generateRgbColor();
    const clicks = this.state.clicks.slice();

    clicks.push({ pos, color });
    this.setState({ clicks });
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

  private _renderMoveInCanvas(move: MouseMove) {
    move.points.forEach((p: MousePos, i: number) => {
      if (i === 0) {
        this._ctx.beginPath();
        this._ctx.moveTo(p.x, p.y);
      } else if (i > 0) {
        this._ctx.lineTo(p.x, p.y);
      }

      if (i === move.points.length - 1) {
        this._ctx.strokeStyle = move.color;
        this._ctx.stroke();
      }
    });
  }
}
