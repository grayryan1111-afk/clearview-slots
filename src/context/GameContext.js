import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GameContext = createContext();

const STORAGE_KEY = '@clearview_slots_state';

const defaultState = {
  coins: 5000,
  bet: 50,
  isVIP: false,
  level: 1,
  xp: 0,
  bestWin: 0,
  totalSpins: 0,
  lastDailyBonus: null
};

export function GameProvider({ children }) {
  const [state, setState] = useState(defaultState);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          setState(JSON.parse(saved));
        }
      } catch (e) {
        console.log('Failed to load saved state', e);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() =>
      console.log('Failed to save state')
    );
  }, [state, loaded]);

  const update = (patch) => setState((prev) => ({ ...prev, ...patch }));

  const addCoins = (amount) => update({ coins: state.coins + amount });

  const spendCoins = (amount) => {
    if (state.coins < amount) {
      Alert.alert('Not enough coins', 'Visit the shop or lower your bet.');
      return false;
    }
    update({ coins: state.coins - amount });
    return true;
  };

  const recordWin = (amount) => {
    const newBest = amount > state.bestWin ? amount : state.bestWin;
    const newXp = state.xp + amount;
    let newLevel = state.level;
    while (newXp >= newLevel * 1000) {
      newLevel += 1;
    }

    update({
      coins: state.coins + amount,
      bestWin: newBest,
      xp: newXp,
      level: newLevel,
      totalSpins: state.totalSpins + 1
    });
  };

  const setBet = (bet) => update({ bet });

  const claimVIP = () => {
    if (state.isVIP) return;
    update({ isVIP: true });
    Alert.alert('VIP Unlocked', 'You now earn 5% more on every win!');
  };

  const canClaimDaily = () => {
    if (!state.lastDailyBonus) return true;
    const last = new Date(state.lastDailyBonus);
    const now = new Date();
    const diffHours = (now - last) / (1000 * 60 * 60);
    return diffHours >= 24;
  };

  const markDailyClaimed = () =>
    update({ lastDailyBonus: new Date().toISOString() });

  const resetProgress = () => {
    Alert.alert('Reset Progress', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reset',
        style: 'destructive',
        onPress: () => setState(defaultState)
      }
    ]);
  };

  const value = {
    state,
    loaded,
    addCoins,
    spendCoins,
    recordWin,
    setBet,
    claimVIP,
    canClaimDaily,
    markDailyClaimed,
    resetProgress
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  return useContext(GameContext);
}
