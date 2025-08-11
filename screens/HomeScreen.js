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


  if (carregando) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  
  if (erro) {
      return (
        <View style={styles.centered}>
            <Header titulo="Catálogo" />
            <Text style={styles.errorText}>{erro}</Text>
        </View>
      )
  }

  
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
    backgroundColor: '#f7f5f2', 
  },
  lista: {
    paddingHorizontal: 8, 
    paddingBottom: 20,
  },
  touchableCard: {
      flex: 1/2, 
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