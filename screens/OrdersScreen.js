// screens/OrdersScreen.js
import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import PedidoCard from '../components/PedidoCard'; // Renomeado
import Header from '../components/Header';

export default function OrdersScreen() {
  const [compras, setCompras] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // useFocusEffect garante que a lista seja atualizada toda vez que a tela é focada
  useFocusEffect(
    useCallback(() => {
      const carregarCompras = async () => {
        setCarregando(true);
        const dados = await AsyncStorage.getItem('compras');
        // Ordena as compras da mais recente para a mais antiga
        const listaCompras = dados ? JSON.parse(dados) : [];
        listaCompras.sort((a, b) => new Date(b.data) - new Date(a.data));
        setCompras(listaCompras);
        setCarregando(false);
      };
      carregarCompras();
    }, [])
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
      <Header titulo="Meus Pedidos" />
      {compras.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyEmoji}>📦</Text>
          <Text style={styles.emptyTitle}>Nenhum pedido encontrado</Text>
          <Text style={styles.emptySubtitle}>Suas compras aparecerão aqui quando você finalizá-las.</Text>
        </View>
      ) : (
        <FlatList
          data={compras}
          // Chave mais robusta para evitar problemas de renderização
          keyExtractor={(item) => `${item.id}-${item.data}`}
          renderItem={({ item }) => <PedidoCard compra={item} />}
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
    backgroundColor: '#f7f5f2',
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