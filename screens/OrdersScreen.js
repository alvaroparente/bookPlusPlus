// screens/OrdersScreen.js
import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CompraCard from '../components/CompraCard';

export default function OrdersScreen() {
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    const carregarCompras = async () => {
      const dados = await AsyncStorage.getItem('compras');
      setCompras(dados ? JSON.parse(dados) : []);
    };
    carregarCompras();
  }, []);

  return (
    <View style={styles.container}>
      {compras.length === 0 ? (
        <Text style={styles.vazio}>Nenhuma compra realizada.</Text>
      ) : (
        <FlatList
          data={compras}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <CompraCard compra={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  vazio: { textAlign: 'center', marginTop: 40, color: '#666' },
});
