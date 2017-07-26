import { MouseClick } from '../InputTypes';
import { Config } from './Config';

export const clickDistance = (t: MouseClick, i: MouseClick) => {
  const dx = Math.abs(i.pos.x - t.pos.x);
  const dy = Math.abs(i.pos.y - t.pos.y);
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist > Config.CLICK_RADIUS) {
    return 0;
  } else if (dist === 0) {
    return 1;
  }
  return 1 - (dist / Config.CLICK_RADIUS);
};
