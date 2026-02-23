// Programme de 120 jours — A1 → B2
import { leconsA1 } from './programme-a1';
import { leconsA2 } from './programme-a2';
import { leconsB1 } from './programme-b1';
import { leconsB2 } from './programme-b2';

export const programme = [...leconsA1, ...leconsA2, ...leconsB1, ...leconsB2];
