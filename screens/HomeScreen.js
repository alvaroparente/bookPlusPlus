// screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import LivroCard from '../components/LivroCard';
import BookDetailsScreen from './BookDetailsScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function HomeMain({ navigation }) {
  const [livros, setLivros] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch('https://www.googleapis.com/books/v1/volumes?q=livros')
      .then((res) => res.json())
      .then((data) => {
        const livrosFormatados = data.items.map((item) => {
          const info = item.volumeInfo;
          return {
            id: item.id,
            titulo: info.title || 'Título Desconhecido',
            autor: info.authors ? info.authors[0] : 'Autor Desconhecido',
            imagem: info.imageLinks
              ? info.imageLinks.thumbnail
              : 'https://via.placeholder.com/100x150.png?text=Sem+Imagem',
            preco: (Math.random() * 80 + 20).toFixed(2),
            descricao: info.description || '',
          };
        });
        setLivros(livrosFormatados);
        setCarregando(false);
      });
  }, []);

  if (carregando) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <FlatList
      data={livros}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={styles.lista}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Detalhes', { livro: item })}>
          <LivroCard {...item} />
        </TouchableOpacity>
      )}
    />
  );
}

export default function HomeScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Catálogo" component={HomeMain} />
      <Stack.Screen name="Detalhes" component={BookDetailsScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  lista: {
    backgroundColor: '#f4f4f4',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
