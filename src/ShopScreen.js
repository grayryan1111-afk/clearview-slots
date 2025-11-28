import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { useGame } from '../context/GameContext';

const packs = [
  { id: 'small', label: '10,000 Coins', price: '$0.99', amount: 10000 },
  { id: 'medium', label: '75,000 Coins', price: '$4.99', amount: 75000 },
  { id: 'large', label: '200,000 Coins', price: '$9.99', amount: 200000 }
];

export default function ShopScreen({ navigate }) {
  const { addCoins, claimVIP, state } = useGame();

  const fakePurchase = (pack) => {
    // placeholder for real IAP – for now we just grant coins
    addCoins(pack.amount);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shop</Text>
      <Text style={styles.sub}>Buy coin packs (demo, no real money yet)</Text>

      {packs.map((p) => (
        <View key={p.id} style={styles.pack}>
          <Text style={styles.packLabel}>{p.label}</Text>
          <Text style={styles.packPrice}>{p.price}</Text>
          <PrimaryButton
            small
            label="Get Coins"
            onPress={() => fakePurchase(p)}
          />
        </View>
      ))}

      {!state.isVIP && (
        <View style={[styles.pack, styles.vipBox]}>
          <Text style={styles.packLabel}>VIP Upgrade</Text>
          <Text style={styles.packPrice}>Demo: Unlock instantly</Text>
          <PrimaryButton label="Unlock VIP" onPress={claimVIP} />
        </View>
      )}

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
  pack: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10
  },
  vipBox: {
    borderWidth: 1,
    borderColor: '#ffd700'
  },
  packLabel: {
    color: '#fff',
    fontWeight: '600'
  },
  packPrice: {
    color: '#aaa',
    marginBottom: 4
  }
});
