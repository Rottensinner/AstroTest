export type Action = 'thrust' | 'charge' | 'oxygen' | 'repair';
export type Status = 'playing' | 'won' | 'lost';
export interface GameState {
  turn: number; energy: number; oxygen: number; hull: number;
  distance: number; status: Status; log: string[];
}
export const MAX_TURNS = 16;
const clamp = (n: number) => Math.max(0, Math.min(100, n));

export function initialState(): GameState {
  return { turn: 0, energy: 75, oxygen: 80, hull: 80, distance: 0,
    status: 'playing', log: ['SOS: Stacja ratunkowa w zasiegu 100 jednostek.'] };
}

export function forecast(turn: number): string {
  if (turn % 4 === 0) return 'BURZA / -18 kadlub';
  if (turn % 3 === 0) return 'WYCIEK / -12 tlen';
  return 'SEKTOR SPOKOJNY';
}

export function step(state: GameState, action: Action): GameState {
  if (state.status !== 'playing') return state;
  const s = { ...state, turn: state.turn + 1, log: [...state.log] };
  let message = '';
  switch (action) {
    case 'thrust': s.distance += 20; s.energy -= 12; message = 'Silniki: +20 dystans.'; break;
    case 'charge': s.energy += 34; message = 'Panele sloneczne: +34 energia.'; break;
    case 'oxygen': s.oxygen += 38; s.energy -= 6; message = 'Regeneracja: +38 tlen.'; break;
    case 'repair': s.hull += 30; s.energy -= 5; message = 'Naprawa: +30 kadlub.'; break;
  }
  s.energy = clamp(s.energy) - 3;
  s.oxygen = clamp(s.oxygen) - 7;
  s.hull = clamp(s.hull);
  if (s.turn % 4 === 0) { s.hull -= 18; message += ' BURZA: -18 kadlub.'; }
  else if (s.turn % 3 === 0) { s.oxygen -= 12; message += ' WYCIEK: -12 tlen.'; }
  s.energy = clamp(s.energy); s.oxygen = clamp(s.oxygen);
  s.hull = clamp(s.hull); s.distance = clamp(s.distance);
  if (!s.energy || !s.oxygen || !s.hull) {
    s.status = 'lost'; message += ' MISJA PRZERWANA.';
  } else if (s.distance >= 100) {
    s.status = 'won'; message += ' DOKOWANIE ZAKONCZONE.';
  } else if (s.turn >= MAX_TURNS) {
    s.status = 'lost'; message += ' OKNO RATUNKOWE ZAMKNIETE.';
  }
  s.log.unshift('T' + String(s.turn).padStart(2, '0') + ' > ' + message);
  return s;
}
