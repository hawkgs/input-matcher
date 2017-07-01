import { expect } from 'chai';
import { MouseClick, ClickType, KeySequence, MouseMove } from '../InputTypes';
import { parseSet, stringifySet } from '../utils/Parser';

describe('Parser', () => {
  describe('parseSet', () => {
    it('should parse a left mouse click', () => {
      const output = parseSet('c 0 128 256').actions[0];

      expect(output).is.instanceof(MouseClick);
      expect((output as MouseClick).type).to.equal(ClickType.Left);
      expect((output as MouseClick).pos).to.eql({ x: 128, y: 256 });
    });

    it('should parse a right mouse click', () => {
      const output = parseSet('c 2 100 200').actions[0];

      expect(output).is.instanceof(MouseClick);
      expect((output as MouseClick).type).to.equal(ClickType.Right);
      expect((output as MouseClick).pos).to.eql({ x: 100, y: 200 });
    });

    it('should parse a scroll mouse click', () => {
      const output = parseSet('c 1 100 200').actions[0];

      expect(output).is.instanceof(MouseClick);
      expect((output as MouseClick).type).to.equal(ClickType.Scroll);
      expect((output as MouseClick).pos).to.eql({ x: 100, y: 200 });
    });

    it('should parse a key sequence with a single element', () => {
      const output = parseSet('k 45').actions[0];

      expect(output).is.instanceof(KeySequence);
      expect((output as KeySequence).keyCodes.pop()).to.equal(45);
    });

    it('should parse a key sequence with multiple elements', () => {
      const output = parseSet('k 45 47 49 51 53').actions[0];

      expect(output).is.instanceof(KeySequence);
      expect((output as KeySequence).keyCodes).to.eql([45, 47, 49, 51, 53]);
    });

    it('should parse a mouse move (line)', () => {
      const output = parseSet('m 100 200 150 250').actions[0];

      expect(output).is.instanceof(MouseMove);
      expect((output as MouseMove).points).to.eql([{ x: 100, y: 200 }, { x: 150, y: 250 }]);
    });

    it('should parse a mouse move', () => {
      const output = parseSet('m 1 2 3 4 5 6 7 8 9 10').actions[0];

      expect(output).is.instanceof(MouseMove);
      expect((output as MouseMove).points).to.eql([
        {x: 1, y: 2},
        {x: 3, y: 4},
        {x: 5, y: 6},
        {x: 7, y: 8},
        {x: 9, y: 10}
      ])
    });

    it('should parse input set', () => {
      const output = parseSet('c 0 100 200 c 2 110 201 m 100 200 300 400 k 35 37 m 100 200 300 400 500 600');

      const click1 = output.actions[0];
      const click2 = output.actions[1];
      const move1 = output.actions[2];
      const keyseq = output.actions[3];
      const move2 = output.actions[4];

      expect(click1).is.instanceof(MouseClick);
      expect(click2).is.instanceof(MouseClick);
      expect(move1).is.instanceof(MouseMove);
      expect(keyseq).is.instanceof(KeySequence);
      expect(move2).is.instanceof(MouseMove);

      expect((click1 as MouseClick).type).to.equal(ClickType.Left);
      expect((click1 as MouseClick).pos).to.eql({ x: 100, y: 200 });

      expect((click2 as MouseClick).type).to.equal(ClickType.Right);
      expect((click2 as MouseClick).pos).to.eql({ x: 110, y: 201 });

      expect((move1 as MouseMove).points).to.eql([{ x: 100, y: 200 }, { x: 300, y: 400 }]);

      expect((keyseq as KeySequence).keyCodes).to.eql([35, 37]);

      expect((move2 as MouseMove).points).to.eql([
        { x: 100, y: 200 },
        { x: 300, y: 400 },
        { x: 500, y: 600 }
      ]);
    });
  });
});
