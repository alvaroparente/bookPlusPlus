import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

export default function SwipeableFavorito({ livro, onRemove, onPress }) {
  // Render do botão que aparece ao deslizar para esquerda
  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity onPress={() => onRemove(livro.id)} style={styles.deleteButton}>
        <Animated.View style={{ transform: [{ scale }] }}>
          <Ionicons name="trash-outline" size={30} color="white" />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <Image source={{ uri: livro.imagem }} style={styles.imagem} />
        <View style={styles.info}>
          <Text style={styles.titulo}>{livro.titulo || 'Título indisponível'}</Text>
          <Text style={styles.autor}>{livro.autor || 'Autor desconhecido'}</Text>
          <Text style={styles.preco}>R$ {livro.preco || '0,00'}</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
  },
  imagem: { width: 60, height: 90, borderRadius: 4 },
  info: { marginLeft: 10, justifyContent: 'space-between', flex: 1 },
  titulo: { fontSize: 16, fontWeight: 'bold' },
  autor: { fontSize: 14, color: '#333' },
  preco: { fontSize: 14, color: '#2a9d8f' },
  deleteButton: {
    backgroundColor: '#c0392b',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    borderRadius: 8,
    marginVertical: 5,
  },
});
