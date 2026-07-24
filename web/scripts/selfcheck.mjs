import assert from "node:assert";
import { createGame, moveErrorFor, applyMove, pieceAt } from "../src/game/rules.js";

const game = createGame(4);

assert.equal(pieceAt(game, "A", 0).owner, "P1");
assert.equal(pieceAt(game, "A", 3).owner, "P2");
assert.equal(pieceAt(game, "A", 1), null);

assert.equal(moveErrorFor(game, { col: "A", row: 0 }), null, "own piece is selectable");
assert.equal(moveErrorFor(game, { col: "A", row: 3 }), "opponent-piece");
assert.equal(moveErrorFor(game, { col: "A", row: 1 }), "empty-cell");

const movedId = pieceAt(game, "A", 0).id;
const afterMove = applyMove(game, { col: "A", row: 0 }, { col: "C", row: 2 });
assert.equal(pieceAt(afterMove, "A", 0), null);
assert.equal(pieceAt(afterMove, "C", 2).owner, "P1");
assert.equal(pieceAt(afterMove, "C", 2).id, movedId, "piece keeps its identity across a move");
assert.equal(afterMove.turn, "P2");
// original game state is untouched (immutability matches the pure-function contract)
assert.equal(pieceAt(game, "A", 0).owner, "P1");

console.log("ok");
