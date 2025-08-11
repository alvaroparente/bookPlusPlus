// components/SwipeableFavorito.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

export default function SwipeableFavorito({ livro, onRemove, onPress }) {
  
  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity onPress={() => onRemove(livro.id, livro.titulo)} style={styles.deleteButton}>
        <Animated.View style={[styles.deleteButtonContent, { transform: [{ scale }] }]}>
          <Ionicons name="trash-outline" size={28} color="white" />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions} overshootRight={false}>
      <TouchableOpacity style={styles.cardContainer} onPress={onPress} activeOpacity={0.7}>
        <Image source={{ uri: livro.imagem }} style={styles.imagem} />
        <View style={styles.infoContainer}>
          <Text style={styles.titulo} numberOfLines={2}>{livro.titulo}</Text>
          <Text style={styles.autor}>{livro.autor}</Text>
          <Text style={styles.preco}>R$ {livro.preco}</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#c7c7cc" />
      </TouchableOpacity>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 12,
    // Sombra suave
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imagem: {
    width: 70,
    height: 105,
    borderRadius: 8,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  autor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  preco: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF', 
  },
  deleteButton: {
    backgroundColor: '#e74c3c', 
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    marginVertical: 8,
    marginRight: 15,
    borderRadius: 12,
  },
  deleteButtonContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});