// screens/CheckoutScreen.js
import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, ScrollView, Image
} from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderComVoltar from '../components/HeaderComVoltar'; // Importe o header

export default function CheckoutScreen({ route, navigation }) {
  const { livro } = route.params;
  const [endereco, setEndereco] = useState('Não foi possível obter o endereço.');
  const [carregando, setCarregando] = useState(true);

  // Lógica para obter endereço permanece a mesma
  useEffect(() => {
    const obterEndereco = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permissão negada', 'Ative a permissão de localização nas configurações do seu aparelho para continuar.');
          return;
        }

        const localizacao = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        const reverseGeocode = await Location.reverseGeocodeAsync(localizacao.coords);
        
        const end = reverseGeocode[0];
        setEndereco(`${end.street || ''}, ${end.streetNumber || ''}\n${end.district || ''}, ${end.city || ''} - ${end.region || ''}\n${end.postalCode || ''}`);

      } catch (error) {
        console.error("Erro ao obter endereço:", error);
        Alert.alert('Erro', 'Não foi possível obter sua localização. Verifique suas conexões e permissões.');
      } finally {
        setCarregando(false);
      }
    };
    obterEndereco();
  }, []);

  // Lógica de confirmação de compra permanece a mesma
  const confirmarCompra = async () => {
    const novaCompra = { ...livro, endereco, data: new Date().toISOString() };
    const comprasExistentes = await AsyncStorage.getItem('compras');
    const lista = comprasExistentes ? JSON.parse(comprasExistentes) : [];
    lista.push(novaCompra);
    await AsyncStorage.setItem('compras', JSON.stringify(lista));

    Alert.alert('Compra Confirmada!', 'Seu pedido foi realizado com sucesso. Você será redirecionado.');
    // Idealmente, limpe o carrinho aqui se houver um
    navigation.popToTop(); // Volta para o início da pilha (Catálogo)
    navigation.navigate('Meus Pedidos'); // Abre a tela de pedidos
  };

  // Nova tela de carregamento
  if (carregando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Buscando seu endereço...</Text>
      </View>
    );
  }

  // Tela principal redesenhada
  return (
    <View style={styles.container}>
      <HeaderComVoltar titulo="Finalizar Pedido" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Resumo do Pedido</Text>
        <View style={styles.card}>
          <View style={styles.livroInfoContainer}>
            <Image source={{ uri: livro.imagem }} style={styles.livroImagem} />
            <View style={styles.livroTextoContainer}>
              <Text style={styles.livroTitulo} numberOfLines={2}>{livro.titulo}</Text>
              <Text style={styles.livroAutor}>{livro.autor}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Endereço de Entrega</Text>
        <View style={styles.card}>
          <Text style={styles.endereco}>📍 {endereco}</Text>
          <TouchableOpacity onPress={() => Alert.alert("Editar Endereço", "Funcionalidade a ser implementada.")}>
            <Text style={styles.editarEndereco}>Alterar endereço</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Resumo Financeiro</Text>
        <View style={styles.card}>
          <View style={styles.resumoLinha}>
            <Text style={styles.resumoLabel}>Subtotal</Text>
            <Text style={styles.resumoValor}>R$ {livro.preco}</Text>
          </View>
          <View style={styles.resumoLinha}>
            <Text style={styles.resumoLabel}>Frete</Text>
            <Text style={styles.resumoValor}>Grátis</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.resumoLinha}>
            <Text style={styles.resumoTotalLabel}>Total</Text>
            <Text style={styles.resumoTotalValor}>R$ {livro.preco}</Text>
          </View>
        </View>

      </ScrollView>

      {/* Rodapé fixo para confirmar */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.botaoConfirmar} onPress={confirmarCompra}>
          <Text style={styles.botaoTexto}>Confirmar Compra</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f5f2' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7f5f2' },
  loadingText: { marginTop: 15, fontSize: 16, color: '#555' },
  scrollContent: { padding: 20, paddingBottom: 120 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10, marginTop: 15 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  livroInfoContainer: { flexDirection: 'row', alignItems: 'center' },
  livroImagem: { width: 60, height: 90, borderRadius: 8, marginRight: 15 },
  livroTextoContainer: { flex: 1 },
  livroTitulo: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  livroAutor: { fontSize: 14, color: '#666', marginTop: 4 },
  endereco: { fontSize: 16, color: '#333', lineHeight: 24 },
  editarEndereco: { color: '#007AFF', fontWeight: '600', marginTop: 10 },
  resumoLinha: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8 },
  resumoLabel: { fontSize: 16, color: '#555' },
  resumoValor: { fontSize: 16, color: '#333' },
  resumoTotalLabel: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  resumoTotalValor: { fontSize: 18, fontWeight: 'bold', color: '#007AFF' },
  divider: { height: 1, backgroundColor: '#e8e8e8', marginVertical: 10 },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, paddingTop: 15, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e8e8e8' },
  botaoConfirmar: { backgroundColor: '#007AFF', padding: 15, borderRadius: 30, alignItems: 'center' },
  botaoTexto: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});