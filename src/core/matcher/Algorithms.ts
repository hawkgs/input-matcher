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

/**
 * Calculates the Damerau-Levenshtein distance between two strings.
 * Source: https://gist.github.com/IceCreamYou/8396172
 */
export const damerauLevenshteinDistance = (source: number[], target: number[]) => {
  if (!source) {
    return target ? target.length : 0;
  } else if (!target) {
    return source.length;
  }

  const m = source.length;
  const n = target.length;
  const INF = m + n;
  const score = new Array(m + 2);
  const sd: any = {};

  for (let i = 0; i < m + 2; i++) {
    score[i] = new Array(n + 2);
  }

  score[0][0] = INF;

  for (let i = 0; i <= m; i++) {
    score[i + 1][1] = i;
    score[i + 1][0] = INF;
    sd[source[i]] = 0;
  }

  for (let j = 0; j <= n; j++) {
    score[1][j + 1] = j;
    score[0][j + 1] = INF;
    sd[target[j]] = 0;
  }

  for (let i = 1; i <= m; i++) {
    let DB = 0;
    for (var j = 1; j <= n; j++) {
      const i1 = sd[target[j - 1]];
      const j1 = DB;

      if (source[i - 1] === target[j - 1]) {
        score[i + 1][j + 1] = score[i][j];
        DB = j;
      } else {
        score[i + 1][j + 1] = Math.min(score[i][j], Math.min(score[i + 1][j], score[i][j + 1])) + 1;
      }

      score[i + 1][j + 1] = Math.min(
        score[i + 1][j + 1],
        score[i1] ? score[i1][j1] + (i - i1 - 1) + 1 + (j - j1 - 1) : Infinity
      );
    }
    sd[source[i - 1]] = i;
  }
  return score[m + 1][n + 1];
};
