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
        <PrimaryButton
