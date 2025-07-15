// screens/FavoritesScreen.js
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';   // ícone da lixeira
import SwipeableFavorito from '../components/SwipeableFavorito';

export default function FavoritesScreen() {
  const [favoritos, setFavoritos] = useState([]);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const carregarFavoritos = async () => {
        const dados = await AsyncStorage.getItem('favoritos');
        setFavoritos(dados ? JSON.parse(dados) : []);
      };
      carregarFavoritos();
    }, [])
  );


  const removerFavorito = async (id) => {
    const novaLista = favoritos.filter((item) => item.id !== id);
    setFavoritos(novaLista);
    await AsyncStorage.setItem('favoritos', JSON.stringify(novaLista));
  };

  const confirmarRemocao = (id, titulo) =>
    Alert.alert(
      'Remover favorito',
      `Tem certeza que deseja remover “${titulo}” dos favoritos?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Remover', style: 'destructive', onPress: () => removerFavorito(id) },
      ]
    );


  const renderItem = ({ item }) => (
  <SwipeableFavorito
    livro={item}
    onRemove={(id) => {
      Alert.alert(
        'Remover favorito',
        `Tem certeza que deseja remover “${item.titulo}” dos favoritos?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Remover', style: 'destructive', onPress: () => removerFavorito(id) },
        ]
      );
    }}
    onPress={() => navigation.navigate('BookDetails', { livro: item })}
  />
);

  return (
    <View style={styles.container}>
      {favoritos.length === 0 ? (
        <Text style={styles.msg}>Nenhum livro foi favoritado ainda.</Text>
      ) : (
        <FlatList
          data={favoritos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  msg: { marginTop: 40, textAlign: 'center', fontSize: 16, color: '#666' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
  },
  flex: { flexDirection: 'row', flex: 1 },
  imagem: { width: 60, height: 90, borderRadius: 4 },
  info: { marginLeft: 10, justifyContent: 'space-between', flex: 1 },
  titulo: { fontSize: 16, fontWeight: 'bold' },
  autor: { fontSize: 14, color: '#333' },
  preco: { fontSize: 14, color: '#2a9d8f' },
});
