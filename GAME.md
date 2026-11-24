# DEEP SPACE — prototyp RetroUI

Trasa: /game. Uruchom w katalogu głównym: npm ci, npm run dev.

Zasady: 100 jednostek dystansu w 16 turach. Każda tura zużywa 3 energii i 7 tlenu. Każda czwarta tura przynosi burzę, co trzecia (jeśli nie ma burzy) wyciek tlenu. Zero któregokolwiek zasobu oznacza porażkę.

Architektura:
- src/game/engine.ts — czysta logika TypeScript, bez DOM i Astro.
- src/pages/game.astro — interfejs, istniejące komponenty RetroUI i obsługa zdarzeń.
- tests/game.test.mjs — testy silnika gry.

Weryfikacja: node --test tests/game.test.mjs, npm run check, npm run build.
