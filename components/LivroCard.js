// components/LivroCard.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function LivroCard({ titulo, autor, preco, imagem }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imagem }} style={styles.imagem} />
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.preco}>R$ {preco}</Text>
      <Text style={styles.autor}>Autor: {autor}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 160,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    padding: 10,
    alignItems: 'center',
  },
  imagem: {
    width: 100,
    height: 150,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  titulo: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  preco: {
    fontSize: 12,
    color: '#2a9d8f',
    marginTop: 4,
  },
  autor: {
    fontSize: 12,
    color: '#555',
    marginTop: 2,
    textAlign: 'center',
  },
});
