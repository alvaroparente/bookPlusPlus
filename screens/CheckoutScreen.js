// screens/CheckoutScreen.js
import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert
} from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CheckoutScreen({ route, navigation }) {
  const { livro } = route.params;
  const [endereco, setEndereco] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    obterEndereco();
  }, []);

  const obterEndereco = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Não foi possível obter a localização.');
      setCarregando(false);
      return;
    }

    const localizacao = await Location.getCurrentPositionAsync({});
    const reverseGeocode = await Location.reverseGeocodeAsync({
      latitude: localizacao.coords.latitude,
      longitude: localizacao.coords.longitude,
    });

    const enderecoFormatado = reverseGeocode[0];
    const enderecoCompleto = `${enderecoFormatado.street || ''}, ${enderecoFormatado.district || ''}, ${enderecoFormatado.city || ''} - ${enderecoFormatado.region || ''}`;

    setEndereco(enderecoCompleto);
    setCarregando(false);
  };

  const confirmarCompra = async () => {
    const novaCompra = {
      ...livro,
      endereco,
      data: new Date().toLocaleDateString(),
    };

    const comprasExistentes = await AsyncStorage.getItem('compras');
    const lista = comprasExistentes ? JSON.parse(comprasExistentes) : [];

    lista.push(novaCompra);
    await AsyncStorage.setItem('compras', JSON.stringify(lista));

    Alert.alert('Sucesso', 'Compra realizada com sucesso!');
    navigation.navigate('Meus Pedidos');
  };

  if (carregando) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={{ marginTop: 10 }}>Obtendo endereço...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Confirmar Compra</Text>
      <Text style={styles.info}>Livro: {livro.titulo}</Text>
      <Text style={styles.info}>Autor: {livro.autor}</Text>
      <Text style={styles.info}>Preço: R$ {livro.preco}</Text>
      <Text style={styles.enderecoTitulo}>Endereço de entrega:</Text>
      <Text style={styles.endereco}>{endereco}</Text>

      <TouchableOpacity style={styles.botao} onPress={confirmarCompra}>
        <Text style={styles.botaoTexto}>Confirmar Compra</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  info: { fontSize: 16, marginVertical: 4 },
  enderecoTitulo: { fontSize: 16, marginTop: 20, fontWeight: 'bold' },
  endereco: { fontSize: 15, color: '#333', marginBottom: 30 },
  botao: {
    backgroundColor: '#2a9d8f',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
