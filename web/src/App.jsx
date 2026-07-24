import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Paper, Stack, Typography, Slider, TextField, Button, Box, Alert, ButtonBase } from "@mui/material";
import { createGame, moveErrorFor, applyMove, pieceAt, ALPHABET } from "./game/rules.js";
import { MESSAGES } from "./game/messages.js";

const MIN_SIZE = 3;
const MAX_SIZE = ALPHABET.length;
const DEFAULT_COLORS = { P1: "#ef4444", P2: "#3b82f6" };

const cardMotion = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.35, ease: "easeOut" },
};

function SetupForm({ onStart }) {
  const [size, setSize] = useState(4);
  const [names, setNames] = useState({ P1: "Oyuncu 1", P2: "Oyuncu 2" });
  const [colors, setColors] = useState(DEFAULT_COLORS);

  return (
    <Paper
      component={motion.form}
      {...cardMotion}
      elevation={0}
      className="glass-card"
      onSubmit={(e) => {
        e.preventDefault();
        onStart(size, names, colors);
      }}
    >
      <Stack spacing={3}>
        <Typography variant="h4" align="center" className="title-gradient">
          Keystone
        </Typography>

        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Tahta boyutu
          </Typography>
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Slider
              value={size}
              min={MIN_SIZE}
              max={MAX_SIZE}
              step={1}
              marks
              onChange={(_, v) => setSize(v)}
            />
            <Typography sx={{ fontWeight: 700, minWidth: "1.5rem", textAlign: "center" }}>
              {size}
            </Typography>
          </Stack>
        </Box>

        {["P1", "P2"].map((p) => (
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }} key={p}>
            <input
              type="color"
              className="color-swatch"
              value={colors[p]}
              onChange={(e) => setColors({ ...colors, [p]: e.target.value })}
            />
            <TextField
              fullWidth
              size="small"
              value={names[p]}
              onChange={(e) => setNames({ ...names, [p]: e.target.value })}
              slotProps={{ htmlInput: { maxLength: 16 } }}
            />
          </Stack>
        ))}

        <Button type="submit" variant="contained" size="large" fullWidth>
          Oyuna Başla
        </Button>
      </Stack>
    </Paper>
  );
}

function Piece({ piece, color, colIndex, rowIndex }) {
  return (
    <motion.div
      layoutId={piece.id}
      className="piece"
      style={{ gridColumn: colIndex, gridRow: rowIndex, "--piece-color": color }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    />
  );
}

function Board({ game, colors, selected, onCellClick }) {
  const rows = Array.from({ length: game.size }, (_, i) => i);
  const gridTemplateColumns = `2.4rem repeat(${game.size}, 3.4rem)`;
  const gridTemplateRows = `2.4rem repeat(${game.size}, 3.4rem)`;

  return (
    <Box className="board" sx={{ gridTemplateColumns, gridTemplateRows }}>
      <div className="corner" style={{ gridColumn: 1, gridRow: 1 }} />
      {game.columns.map((col, i) => (
        <div className="header" key={col} style={{ gridColumn: i + 2, gridRow: 1 }}>
          {col}
        </div>
      ))}
      {rows.map((row) => (
        <div className="header" key={row} style={{ gridColumn: 1, gridRow: row + 2 }}>
          {row + 1}
        </div>
      ))}

      {game.columns.map((col, ci) =>
        rows.map((row) => (
          <ButtonBase
            key={`${col}${row}`}
            className="cell"
            style={{ gridColumn: ci + 2, gridRow: row + 2 }}
            onClick={() => onCellClick({ col, row })}
          />
        ))
      )}

      {selected && (
        <motion.div
          layoutId="selection-ring"
          className="selection-ring"
          style={{
            gridColumn: game.columns.indexOf(selected.col) + 2,
            gridRow: selected.row + 2,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
        />
      )}

      {game.pieces.map((piece) => (
        <Piece
          key={piece.id}
          piece={piece}
          color={colors[piece.owner]}
          colIndex={game.columns.indexOf(piece.col) + 2}
          rowIndex={piece.row + 2}
        />
      ))}
    </Box>
  );
}

export default function App() {
  const [game, setGame] = useState(null);
  const [players, setPlayers] = useState(null);
  const [colors, setColors] = useState(null);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState("");

  function startGame(size, names, chosenColors) {
    setGame(createGame(size));
    setPlayers(names);
    setColors(chosenColors);
    setSelected(null);
    setMessage("");
  }

  function handleCellClick(cell) {
    if (!selected) {
      const error = moveErrorFor(game, cell);
      if (error) {
        setMessage(MESSAGES[error]);
        return;
      }
      setSelected(cell);
      setMessage("");
      return;
    }

    if (selected.col === cell.col && selected.row === cell.row) {
      setSelected(null);
      return;
    }

    const piece = pieceAt(game, cell.col, cell.row);
    if (piece?.owner === game.turn) {
      setSelected(cell);
      setMessage("");
      return;
    }
    if (piece) {
      setMessage(MESSAGES["target-occupied"]);
      return;
    }

    setGame(applyMove(game, selected, cell));
    setSelected(null);
    setMessage("");
  }

  return (
    <AnimatePresence mode="wait">
      {!game ? (
        <SetupForm key="setup" onStart={startGame} />
      ) : (
        <Paper component={motion.div} key="game" {...cardMotion} elevation={0} className="glass-card">
          <Stack spacing={2.5}>
            <Typography variant="h4" align="center" className="title-gradient">
              Keystone
            </Typography>

            <AnimatePresence mode="wait">
              <motion.div
                key={game.turn}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.2 }}
              >
                <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: "center" }}>
                  <Box className="dot" sx={{ background: colors[game.turn] }} />
                  <Typography fontWeight={700}>{players[game.turn]}</Typography>
                  <Typography color="text.secondary" variant="body2">
                    {selected ? "hareket edilecek boş kareyi seçin" : "taşınızı seçin"}
                  </Typography>
                </Stack>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence>
              {message && (
                <motion.div
                  key={message}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  <Alert severity="warning" variant="outlined">
                    {message}
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            <Board game={game} colors={colors} selected={selected} onCellClick={handleCellClick} />

            <Button variant="outlined" sx={{ alignSelf: "center" }} onClick={() => setGame(null)}>
              Yeni Oyun
            </Button>
          </Stack>
        </Paper>
      )}
    </AnimatePresence>
  );
}
