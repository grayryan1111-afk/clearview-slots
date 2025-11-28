// Basic symbol table: weight controls frequency, payout is per-line multiplier
export const symbols = [
  { id: 'CHERRY', label: '🍒', weight: 30, payout3: 5, payout4: 10, payout5: 20 },
  { id: 'BAR', label: 'BAR', weight: 25, payout3: 10, payout4: 20, payout5: 40 },
  { id: 'CASH', label: '💵', weight: 20, payout3: 15, payout4: 30, payout5: 60 },
  { id: 'GOLD', label: '🥇', weight: 15, payout3: 20, payout4: 40, payout5: 80 },
  { id: 'DIAMOND', label: '💎', weight: 8, payout3: 50, payout4: 100, payout5: 200 },
  { id: 'SEVEN', label: '7️⃣', weight: 2, payout3: 100, payout4: 300, payout5: 500 }
];

const PAYLINES = [
  // rows: 0 = top, 1 = middle, 2 = bottom
  [ [0,0], [0,1], [0,2], [0,3], [0,4] ], // top
  [ [1,0], [1,1], [1,2], [1,3], [1,4] ], // middle
  [ [2,0], [2,1], [2,2], [2,3], [2,4] ], // bottom
  [ [0,0], [1,1], [2,2], [1,3], [0,4] ], // V
  [ [2,0], [1,1], [0,2], [1,3], [2,4] ]  // ^
];

function buildWeightedPool() {
  const pool = [];
  symbols.forEach((s) => {
    for (let i = 0; i < s.weight; i++) pool.push(s.id);
  });
  return pool;
}

const pool = buildWeightedPool();

export function spinReels(rows = 3, reels = 5) {
  const board = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < reels; c++) {
      const idx = Math.floor(Math.random() * pool.length);
      row.push(pool[idx]);
    }
    board.push(row);
  }
  return board;
}

export function evaluateBoard(board, bet, isVIP = false) {
  let totalWin = 0;
  const winningLines = [];

  PAYLINES.forEach((line, index) => {
    const ids = line.map(([row, col]) => board[row][col]);
    const first = ids[0];
    const count = ids.filter((id) => id === first).length;
    if (count < 3) return;

    const symbol = symbols.find((s) => s.id === first);
    if (!symbol) return;

    let multiplier = 0;
    if (count === 3) multiplier = symbol.payout3;
    if (count === 4) multiplier = symbol.payout4;
    if (count === 5) multiplier = symbol.payout5;

    let win = bet * multiplier;
    if (isVIP) win = Math.round(win * 1.05);

    totalWin += win;
    winningLines.push({
      lineIndex: index,
      symbol: symbol.id,
      count,
      win
    });
  });

  return { totalWin, winningLines };
}
