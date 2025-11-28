import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function PrimaryButton({ label, onPress, disabled, small }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.btn,
        small && styles.small,
        disabled && styles.disabled
      ]}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#f5b300',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4
  },
  small: {
    paddingVertical: 6,
    paddingHorizontal: 12
  },
  disabled: {
    opacity: 0.6
  },
  text: {
    fontWeight: '700',
    color: '#222'
  }
});
