// screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import LivroCard from '../components/LivroCard';
import BookDetailsScreen from './BookDetailsScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../components/Header';

const Stack = createNativeStackNavigator();

function HomeMain({ navigation }) {
  const [livros, setLivros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetch('https://www.googleapis.com/books/v1/volumes?q=react+native&maxResults=20')
      .then((res) => res.json())
      .then((data) => {
        if (data.items) {
          const livrosFormatados = data.items.map((item) => {
            const info = item.volumeInfo;
            return {
              id: item.id,
              titulo: info.title || 'Título Desconhecido',
              autor: info.authors ? info.authors[0] : 'Autor Desconhecido',
              imagem: info.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192.png?text=Sem+Capa',
              preco: (Math.random() * 80 + 20).toFixed(2),
              descricao: info.description || 'Nenhuma descrição disponível.',
            };
          });
          setLivros(livrosFormatados);
        } else {
            setErro('Nenhum livro encontrado.');
        }
      })
      .catch(e => setErro('Falha ao carregar os livros.'))
      .finally(() => setCarregando(false));
  }, []);

  // Tela de Carregamento
  if (carregando) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  // Tela de Erro
  if (erro) {
      return (
        <View style={styles.centered}>
            <Header titulo="Catálogo" />
            <Text style={styles.errorText}>{erro}</Text>
        </View>
      )
  }

  // Tela Principal
  return (
    <View style={styles.container}>
      <Header titulo="Catálogo de Livros" />
      <FlatList
        data={livros}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.touchableCard}
            onPress={() => navigation.navigate('Detalhes', { livro: item })}
          >
            <LivroCard {...item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// O Stack Navigator permanece o mesmo
export default function HomeScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Catálogo" component={HomeMain} />
      <Stack.Screen name="Detalhes" component={BookDetailsScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f5f2', // Fundo padrão do tema
  },
  lista: {
    paddingHorizontal: 8, // Espaço nas laterais da lista
    paddingBottom: 20,
  },
  touchableCard: {
      flex: 1/2, // Garante que o toque ocupe o mesmo espaço do card
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f5f2',
  },
  errorText: {
    fontSize: 16,
    color: '#555',
  },
});