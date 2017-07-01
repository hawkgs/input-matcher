import { expect } from 'chai';
import { InputAction, MouseClick, ClickType, MouseMove, KeySequence } from '../InputTypes';

describe('InputTypes', () => {
  describe('MouseClick', () => {
    const clickObj = {
      type: ClickType.Scroll,
      pos: { x: 128, y: 256 }
    };

    it('should be instance of InputAction', () => {
      const click = new MouseClick();
      expect(click).is.instanceof(InputAction);
    });

    it('should create an empty mouse click', () => {
      const click = new MouseClick();
      expect(click.type).to.be.undefined;
      expect(click.pos).to.be.undefined;
    });

    it('should create a mouse click', () => {
      const click = new MouseClick(clickObj);
      expect(click.type).to.equal(clickObj.type);
      expect(click.pos).to.eql(clickObj.pos);
    });

    it('should stringify a mouse click', () => {
      const click = new MouseClick(clickObj);
      expect(click.toString()).to.equal('c 1 128 256');
    });
  });

  describe('MouseMove', () => {
    const moveObj = {
      points: [{ x: 16, y: 32 }, { x: 48, y: 64 }]
    };

    it('should be instance of InputAction', () => {
      const move = new MouseMove();
      expect(move).is.instanceof(InputAction);
    });

    it('should create an empty mouse move', () => {
      const move = new MouseMove();
      expect(move.points).to.eql([]);
    });

    it('should create a mouse move', () => {
      const move = new MouseMove(moveObj);
      expect(move.points).to.eql(moveObj.points);
    });

    it('should add a point to the mouse move', () => {
      const move = new MouseMove(moveObj);
      move.addPoint({ x: 128, y: 256 });
      const points = moveObj.points.slice(0);
      points.push({ x: 128, y: 256 });

      expect(move.points).to.eql(points);
    });

    it('should stringify a mouse move', () => {
      const move = new MouseMove(moveObj);
      expect(move.toString()).to.equal('m 16 32 48 64');
    });
  });

  describe('KeySequence', () => {
    const keyseqObj = { keyCodes: [42, 43, 44, 45] };

    it('should be instance of InputAction', () => {
      const keyseq = new KeySequence();
      expect(keyseq).is.instanceof(InputAction);
    });

    it('should create an empty key sequence', () => {
      const keyseq = new KeySequence();
      expect(keyseq.keyCodes).to.eql([]);
    });

    it('should create a key sequence', () => {
      const keyseq = new KeySequence(keyseqObj);
      expect(keyseq.keyCodes).to.eql(keyseqObj.keyCodes);
    });

    it('should add a key code to the sequence', () => {
      const keyseq = new KeySequence(keyseqObj);
      keyseq.addKey(47);
      const codes = keyseqObj.keyCodes.slice(0);
      codes.push(47);

      expect(keyseq.keyCodes).to.eql(codes);
    });

    it('should stringify a key sequence', () => {
      const keyseq = new KeySequence(keyseqObj);
      expect(keyseq.toString()).to.equal('k 42 43 44 45');
    });
  });
});
