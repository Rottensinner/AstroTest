import { test } from 'node:test';
import assert from 'node:assert/strict';
import { initialState, step, forecast } from '../src/game/engine.ts';

test('a balanced flight reaches the station', () => {
  let s = initialState();
  for (const action of ['thrust','thrust','charge','oxygen','thrust','thrust','charge','thrust']) s = step(s, action);
  assert.equal(s.status, 'won');
  assert.equal(s.distance, 100);
  assert.ok(s.energy > 0 && s.oxygen > 0 && s.hull > 0);
  assert.equal(step(s, 'repair'), s);
});
test('reckless flight loses when energy runs out', () => {
  let s = initialState();
  for (let i = 0; i < 5; i++) s = step(s, 'thrust');
  assert.equal(s.status, 'lost');
  assert.equal(s.energy, 0);
});
test('forecast matches hazards and state is immutable', () => {
  const s = initialState();
  const next = step(s, 'charge');
  assert.equal(s.turn, 0);
  assert.equal(s.log.length, 1);
  assert.equal(next.energy, 97);
  assert.match(forecast(4), /BURZA/);
  assert.match(forecast(3), /WYCIEK/);
});
test('mission expires at the turn limit', () => {
  let s = initialState();
  for (let i = 0; i < 16 && s.status === 'playing'; i++) {
    s = step(s, s.oxygen < 45 ? 'oxygen' : s.hull < 55 ? 'repair' : 'charge');
  }
  assert.equal(s.turn, 16);
  assert.equal(s.status, 'lost');
});
