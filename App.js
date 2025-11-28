import React, { useState } from 'react';
import { SafeAreaView, View, StatusBar } from 'react-native';
import { GameProvider } from './src/context/GameContext';
import TopBar from './src/components/TopBar';
import LobbyScreen from './src/screens/LobbyScreen';
import SlotScreen from './src/screens/SlotScreen';
import ShopScreen from './src/screens/ShopScreen';
import BonusScreen from './src/screens/BonusScreen';
import LeaderboardScreen from './src/screens/LeaderboardScreen';
import SettingsScreen from './src/screens/SettingsScreen';

function Navigator() {
  const [screen, setScreen] = useState('LOBBY');

  const navigate = (name) => setScreen(name);

  let body = null;
  if (screen === 'LOBBY') body = <LobbyScreen navigate={navigate} />;
  if (screen === 'SLOT') body = <SlotScreen navigate={navigate} />;
  if (screen === 'SHOP') body = <ShopScreen navigate={navigate} />;
  if (screen === 'BONUS') body = <BonusScreen navigate={navigate} />;
  if (screen === 'LEADERBOARD') body = <LeaderboardScreen navigate={navigate} />;
  if (screen === 'SETTINGS') body = <SettingsScreen navigate={navigate} />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <StatusBar barStyle="light-content" />
      <TopBar />
      <View style={{ flex: 1 }}>{body}</View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <GameProvider>
      <Navigator />
    </GameProvider>
  );
}
