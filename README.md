# Keystone

A small turn-based grid game: each player's pieces start on opposite edges of the board, and players take turns moving one of their own pieces to any empty square.

## Structure

- [`web/`](web) — the game with a React (Vite) UI. This is the version to play.
- [`python/`](python) — the original console version the game logic is ported from.

## Play it

```bash
cd web
npm install
npm run dev
```

## Run the original console version

```bash
python3 python/game.py
```
