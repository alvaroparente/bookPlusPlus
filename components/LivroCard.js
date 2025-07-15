// components/LivroCard.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function LivroCard({ titulo, autor, preco, imagem }) {
  // Limita o tamanho do título para não quebrar o layout
  const tituloFormatado = titulo.length > 35 ? `${titulo.substring(0, 32)}...` : titulo;

  return (
    <View style={styles.card}>
      <Image source={{ uri: imagem }} style={styles.imagem} />
      <View style={styles.infoContainer}>
        <Text style={styles.titulo}>{tituloFormatado}</Text>
        <Text style={styles.autor}>{autor}</Text>
        <Text style={styles.preco}>R$ {preco}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1, // Permite que o card se expanda na coluna
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 12, // Bordas mais arredondadas
    overflow: 'hidden', // Garante que a imagem com borda arredondada não vaze
    // Sombra mais suave
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  imagem: {
    width: '100%',
    height: 180, // Imagem um pouco maior
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 12,
  },
  titulo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  autor: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  preco: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF', // Usando a cor primária para destaque
  },
});