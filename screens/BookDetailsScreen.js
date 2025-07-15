// screens/BookDetailsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';



export default function BookDetailsScreen({ route }) {
  const { livro } = route.params;
  const [favorito, setFavorito] = useState(false);
  const navigation = useNavigation();


  useEffect(() => {
    verificarFavorito();
  }, []);

  const verificarFavorito = async () => {
    const favoritos = await AsyncStorage.getItem('favoritos');
    const lista = favoritos ? JSON.parse(favoritos) : [];
    setFavorito(lista.some((item) => item.id === livro.id));
  };

  const toggleFavorito = async () => {
    const favoritos = await AsyncStorage.getItem('favoritos');
    let lista = favoritos ? JSON.parse(favoritos) : [];

    if (favorito) {
      lista = lista.filter((item) => item.id !== livro.id);
    } else {
      lista.push(livro);
    }

    await AsyncStorage.setItem('favoritos', JSON.stringify(lista));
    setFavorito(!favorito);
  };

  return (
    
    <ScrollView contentContainerStyle={styles.container}>

      <Image source={{ uri: livro.imagem }} style={styles.imagem} />
      <Text style={styles.titulo}>{livro.titulo}</Text>
      <Text style={styles.autor}>Autor: {livro.autor}</Text>
      <Text style={styles.preco}>Preço: R$ {livro.preco}</Text>
      <Text style={styles.descricao}>
        {livro.descricao || 'Descrição indisponível para este livro.'}
      </Text>

      <TouchableOpacity style={styles.botao} onPress={toggleFavorito}>
        <Text style={styles.textoBotao}>
          {favorito ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
        </Text>
      </TouchableOpacity>
      <Pressable
  onPress={() => navigation.navigate('Checkout', { livro })}
  style={({ pressed }) => [
    styles.botaoComprar,
    { backgroundColor: pressed ? '#3700b3' : '#6200ee' },
  ]}
>
  <Text style={styles.textoBotao}>Comprar</Text>
</Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  imagem: {
    width: 150,
    height: 220,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  autor: {
    fontSize: 16,
    marginTop: 10,
  },
  preco: {
    fontSize: 16,
    color: '#2a9d8f',
    marginTop: 5,
  },
  descricao: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 14,
    color: '#555',
  },
  botao: {
    backgroundColor: '#6200ee',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
