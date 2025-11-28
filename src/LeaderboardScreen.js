import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { useGame } from '../context/GameContext';

export default function LeaderboardScreen({ navigate }) {
  const { state } = useGame();

  // Placeholder local leaderboard – future: connect to backend
  const fakeLeaders = [
    { name: 'You', coins: state.coins },
    { name: 'Bot_777', coins: 1500000 },
    { name: 'LuckyLad', coins: 820000 },
    { name: 'HighRoller', coins: 640000 }
  ].sort((a, b) => b.coins - a.coins);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <Text style={styles.sub}>
        Global leaderboard coming later – for now, local demo.
      </Text>

      {fakeLeaders.map((p, idx) => (
        <View key={idx} style={styles.row}>
          <Text style={styles.rank}>{idx + 1}.</Text>
          <Text style={styles.name}>{p.name}</Text>
          <Text style={styles.score}>{p.coins.toLocaleString()}</Text>
        </View>
      ))}

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
    backgroundColor: '#121212',
    padding: 16
  },
  title: {
    color: '#f5b300',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 6
  },
  sub: {
    color: '#ccc',
    marginBottom: 12
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 8,
    marginBottom: 6
  },
  rank: {
    color: '#aaa',
    width: 24
  },
  name: {
    color: '#fff',
    flex: 1
  },
  score: {
    color: '#f5b300',
    fontWeight: '700'
  }
});
