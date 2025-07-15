// components/PedidoCard.js (antigo CompraCard.js)
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function PedidoCard({ compra }) {
  // Formata a data (ISO string) para o padrão brasileiro (dd/mm/aaaa)
  const dataFormatada = new Date(compra.data).toLocaleDateString('pt-BR');

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Pedido realizado em {dataFormatada}</Text>
        <Text style={styles.status}>Entregue</Text>
      </View>
      <View style={styles.content}>
        <Image source={{ uri: compra.imagem }} style={styles.imagem} />
        <View style={styles.infoContainer}>
          <Text style={styles.titulo} numberOfLines={2}>{compra.titulo}</Text>
          <Text style={styles.autor}>por {compra.autor}</Text>
          <Text style={styles.preco}>R$ {compra.preco}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.endereco}>📍 Entregue em: {compra.endereco}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 15,
    marginVertical: 8,
    // Sombra
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerText: {
    fontSize: 13,
    color: '#666',
  },
  status: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#27ae60', // Verde para status positivo
  },
  content: {
    flexDirection: 'row',
    padding: 12,
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
  footer: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  endereco: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
  },
});