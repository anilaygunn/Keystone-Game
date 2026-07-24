// Port of python/game.py's board rules — same semantics, kept as-is:
// pieces start on the first and last row, a move only requires the
// source to hold your own piece and the target to be empty (no
// adjacency check, no win condition — matches the original script).
export const ALPHABET = "ABCDEFGH";

export function createGame(size) {
  const columns = ALPHABET.slice(0, size).split("");
  const pieces = [];
  for (const col of columns) {
    pieces.push({ id: `P1-${col}`, owner: "P1", col, row: 0 });
    pieces.push({ id: `P2-${col}`, owner: "P2", col, row: size - 1 });
  }
  return { size, columns, pieces, turn: "P1" };
}

export function pieceAt(game, col, row) {
  return game.pieces.find((p) => p.col === col && p.row === row) ?? null;
}

// cell = { col, row } with row 0-indexed
export function moveErrorFor(game, cell) {
  const piece = pieceAt(game, cell.col, cell.row);
  if (piece?.owner === game.turn) return null;
  if (piece) return "opponent-piece";
  return "empty-cell";
}

export function applyMove(game, from, to) {
  const moving = pieceAt(game, from.col, from.row);
  const pieces = game.pieces.map((p) =>
    p.id === moving.id ? { ...p, col: to.col, row: to.row } : p
  );
  return { ...game, pieces, turn: game.turn === "P1" ? "P2" : "P1" };
}
