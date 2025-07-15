import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header({ titulo }) {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>{titulo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#6200ee',
    alignItems: 'center',
  },
  texto: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
