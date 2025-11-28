import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { useGame } from '../context/GameContext';

export default function SettingsScreen({ navigate }) {
  const { resetProgress } = useGame();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Reset Progress</Text>
        <Text style={styles.desc}>
          This will reset your coins, level, XP and stats back to default.
        </Text>
        <PrimaryButton label="Reset Progress" onPress={resetProgress} />
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
    backgroundColor: '#121212',
    padding: 16
  },
  title: {
    color: '#f5b300',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 12
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20
  },
  label: {
    color: '#fff',
    fontWeight: '700'
  },
  desc: {
    color: '#ccc',
    fontSize: 12,
    marginVertical: 6
  }
});
