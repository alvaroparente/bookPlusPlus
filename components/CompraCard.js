import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CompraCard({ compra }) {
  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>{compra.titulo}</Text>
      <Text style={styles.info}>Autor: {compra.autor}</Text>
      <Text style={styles.info}>Preço: R$ {compra.preco}</Text>
      <Text style={styles.info}>Endereço: {compra.endereco}</Text>
      <Text style={styles.data}>Data: {compra.data}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f4f4f4',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  titulo: { fontSize: 16, fontWeight: 'bold' },
  info: { fontSize: 14, marginTop: 2 },
  data: { fontSize: 12, marginTop: 5, color: '#555' },
});
