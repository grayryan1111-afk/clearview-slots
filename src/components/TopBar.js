import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGame } from '../context/GameContext';

export default function TopBar() {
  const { state } = useGame();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.logo}>Clearview Slots</Text>
        <Text style={styles.sub}>Level {state.level} • XP {state.xp}</Text>
      </View>
      <View style={styles.right}>
        {state.isVIP && <Text style={styles.vip}>VIP</Text>}
        <Text style={styles.coins}>💰 {state.coins}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#111'
  },
  logo: {
    color: '#f5b300',
    fontSize: 18,
    fontWeight: '800'
  },
  sub: {
    color: '#aaa',
    fontSize: 11
  },
  right: {
    alignItems: 'flex-end'
  },
  vip: {
    color: '#ffd700',
    fontWeight: '800',
    fontSize: 12
  },
  coins: {
    color: '#fff',
    fontWeight: '700',
    marginTop: 2
  }
});
