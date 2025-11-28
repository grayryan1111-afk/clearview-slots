import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { useGame } from '../context/GameContext';
import { spinReels, evaluateBoard, symbols } from '../game/slotEngine';

export default function SlotScreen({ navigate }) {
  const { state, spendCoins, recordWin, setBet } = useGame();
  const [board, setBoard] = useState(spinReels());
  const [lastWin, setLastWin] = useState(0);
  const [winningLines, setWinningLines] = useState([]);
  const [spinning, setSpinning] = useState(false);

  const handleSpin = () => {
    if (spinning) return;
    if (!spendCoins(state.bet)) return;

    setSpinning(true);
    setLastWin(0);
    setWinningLines([]);

    const newBoard = spinReels();
    setBoard(newBoard);

    // fake a tiny delay like an animation
    setTimeout(() => {
      const { totalWin, winningLines } = evaluateBoard(
        newBoard,
        state.bet,
        state.isVIP
      );
      if (totalWin > 0) {
        recordWin(totalWin);
      }
      setLastWin(totalWin);
      setWinningLines(winningLines);
      setSpinning(false);
    }, 200);
  };

  const changeBet = (delta) => {
    const newBet = Math.max(10, Math.min(1000, state.bet + delta));
    setBet(newBet);
  };

  const renderSymbol = (id) => {
    const s = symbols.find((x) => x.id === id);
    return s ? s.label : id;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Main Slot Machine</Text>

      <View style={styles.reelsContainer}>
        {board.map((row, rowIndex) => (
          <View style={styles.row} key={`row-${rowIndex}`}>
            {row.map((cell, colIndex) => (
              <View style={styles.cell} key={`cell-${rowIndex}-${colIndex}`}>
                <Text style={styles.symbol}>{renderSymbol(cell)}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.info}>Bet: {state.bet}</Text>
        <Text style={styles.info}>Last win: {lastWin}</Text>
      </View>

      {winningLines.length > 0 && (
        <View style={styles.winBox}>
          <Text style={styles.winTitle}>Winning Lines</Text>
          {winningLines.map((line, idx) => (
            <Text key={idx} style={styles.winText}>
              Line {line.lineIndex + 1}: {line.symbol} ×{line.count} → {line.win}
            </Text>
          ))}
        </View>
      )}

      <View style={styles.bets}>
        <PrimaryButton small label="- Bet" onPress={() => changeBet(-10)} />
        <PrimaryButton label={spinning ? 'Spinning...' : 'SPIN'} onPress={handleSpin} />
        <PrimaryButton small label="+ Bet" onPress={() => changeBet(10)} />
      </View>

      <PrimaryButton
        label="⬅ Back to Lobby"
        onPress={() => navigate('LOBBY')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
    padding: 12,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f5b300',
    marginVertical: 8
  },
  reelsContainer: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#f5b300',
    borderRadius: 16,
    padding: 8,
    backgroundColor: '#222'
  },
  row: {
    flexDirection: 'row'
  },
  cell: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderColor: '#444',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
    borderRadius: 8,
    backgroundColor: '#000'
  },
  symbol: {
    fontSize: 26
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 10
  },
  info: {
    color: '#fff'
  },
  winBox: {
    marginTop: 10,
    padding: 8,
    backgroundColor: '#1b3a1b',
    borderRadius: 8,
    width: '90%'
  },
  winTitle: {
    color: '#aaffaa',
    fontWeight: '700'
  },
  winText: {
    color: '#ccffcc',
    fontSize: 12
  },
  bets: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 12
  }
});
