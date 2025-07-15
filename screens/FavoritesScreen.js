// screens/FavoritesScreen.js
import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import SwipeableFavorito from '../components/SwipeableFavorito';
import Header from '../components/Header'; // Importando o Header padrão

export default function FavoritesScreen() {
  const [favoritos, setFavoritos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const carregarFavoritos = async () => {
        setCarregando(true);
        const dados = await AsyncStorage.getItem('favoritos');
        setFavoritos(dados ? JSON.parse(dados) : []);
        setCarregando(false);
      };
      carregarFavoritos();
    }, [])
  );

  const removerFavorito = async (id) => {
    const novaLista = favoritos.filter((item) => item.id !== id);
    setFavoritos(novaLista);
    await AsyncStorage.setItem('favoritos', JSON.stringify(novaLista));
  };

  // Centralizando a lógica do Alert aqui
  const confirmarRemocao = (id, titulo) =>
    Alert.alert(
      'Remover Favorito',
      `Tem certeza que deseja remover "${titulo}" dos seus favoritos?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Remover', style: 'destructive', onPress: () => removerFavorito(id) },
      ]
    );

  const renderItem = ({ item }) => (
    <SwipeableFavorito
      livro={item}
      onRemove={confirmarRemocao}
      // O nome da rota 'BookDetails' foi mantido como no seu código original.
      // Se a rota for 'Detalhes', ajuste aqui.
      onPress={() => navigation.navigate('Detalhes', { livro: item })}
    />
  );

  if (carregando) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header titulo="Meus Favoritos" />
      {favoritos.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyEmoji}>💔</Text>
          <Text style={styles.emptyTitle}>Sua lista está vazia</Text>
          <Text style={styles.emptySubtitle}>Adicione livros aos favoritos para vê-los aqui.</Text>
        </View>
      ) : (
        <FlatList
          data={favoritos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f5f2',
  },
  list: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyEmoji: {
    fontSize: 60,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});