import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { useGame } from '../context/GameContext';

export default function BonusScreen({ navigate }) {
  const { addCoins, canClaimDaily, markDailyClaimed } = useGame();
  const [lastBonus, setLastBonus] = useState(null);

  const handleClaim = () => {
    if (!canClaimDaily()) return;
    const amounts = [5000, 8000, 10000, 15000, 20000, 25000, 30000];
    const amount = amounts[Math.floor(Math.random() * amounts.length)];
    addCoins(amount);
    markDailyClaimed();
    setLastBonus(amount);
  };

  const available = canClaimDaily();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Bonus</Text>
      <Text style={styles.sub}>
        Come back every day for free coins.
      </Text>

      <View style={styles.card}>
        {available ? (
          <>
            <Text style={styles.ready}>Ready to claim!</Text>
            <PrimaryButton label="Spin for Bonus" onPress={handleClaim} />
          </>
        ) : (
          <Text style={styles.wait}>
            You already claimed today. Come back in 24 hours.
          </Text>
        )}

        {lastBonus && (
          <Text style={styles.result}>
            You earned {lastBonus.toLocaleString()} coins!
          </Text>
        )}
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
    marginBottom: 6
  },
  sub: {
    color: '#ccc',
    marginBottom: 12
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20
  },
  ready: {
    color: '#aaffaa',
    fontWeight: '700',
    marginBottom: 8
  },
  wait: {
    color: '#ffaaaa'
  },
  result: {
    color: '#fff',
    marginTop: 10,
    fontWeight: '600'
  }
});
