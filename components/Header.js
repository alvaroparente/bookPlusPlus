// components/Header.js
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function Header({ titulo }) {
  return (
    // SafeAreaView garante que o conteúdo não fique sob a barra de status
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.texto}>{titulo}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#ffffff',
  },
  container: {
    paddingBottom: 15,
    paddingHorizontal: 20,
    paddingTop: 10, 
    width: '100%',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderBottomWidth: 1, 
    borderBottomColor: '#e8e8e8',
  },
  texto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
});