import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { useGame } from '../context/GameContext';

export default function LobbyScreen({ navigate }) {
  const { state } = useGame();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back!</Text>
      <Text style={styles.subtitle}>
        Level {state.level} • Best win: {state.bestWin}
      </Text>

      <View style={styles.buttons}>
        <PrimaryButton label="🎰 Play Slots" onPress={() => navigate('SLOT')} />
        <PrimaryButton label="🛒 Shop" onPress={() => navigate('SHOP')} />
        <PrimaryButton label="🎁 Daily Bonus" onPress={() => navigate('BONUS')} />
        <PrimaryButton label="🏆 Leaderboard" onPress={() => navigate('LEADERBOARD')} />
        <PrimaryButton label="⚙️ Settings" onPress={() => navigate('SETTINGS')} />
      </View>

      <Text style={styles.tip}>
        Tip: VIP players earn +5% on every winning spin.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
    alignItems: 'center'
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#f5b300',
    marginTop: 20
  },
  subtitle: {
    color: '#fff',
    marginTop: 6
  },
  buttons: {
    marginTop: 24,
    width: '80%'
  },
  tip: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 30,
    textAlign: 'center'
  }
});
