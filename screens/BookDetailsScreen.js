// screens/BookDetailsScreen.js
import React, {useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderComVoltar from '../components/HeaderComVoltar'; // Importe o novo header

export default function BookDetailsScreen({ route, navigation }) {
  const { livro } = route.params;
  const [favorito, setFavorito] = useState(false);

  useEffect(() => {
    const verificarFavorito = async () => {
      const favoritos = await AsyncStorage.getItem('favoritos');
      const lista = favoritos ? JSON.parse(favoritos) : [];
      setFavorito(lista.some((item) => item.id === livro.id));
    };
    verificarFavorito();
  }, [livro.id]);

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
    <View style={styles.container}>
      <HeaderComVoltar titulo="Detalhes do Livro" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: livro.imagem }} style={styles.imagem} />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.titulo}>{livro.titulo}</Text>
          <Text style={styles.autor}>por {livro.autor}</Text>
          <Text style={styles.preco}>R$ {livro.preco}</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.descricaoTitulo}>Descrição</Text>
        <Text style={styles.descricao}>
          {livro.descricao || 'Descrição indisponível para este livro.'}
        </Text>
      </ScrollView>

      {/* Rodapé com botões de ação */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.botaoFavorito} onPress={toggleFavorito}>
          <Text style={styles.textoBotaoFavorito}>
            {favorito ? '❤️ Favorito' : '♡ Favoritar'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botaoComprar}
          onPress={() => navigation.navigate('Checkout', { livro })}
        >
          <Text style={styles.textoBotaoComprar}>Comprar Agora</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f5f2',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120, // Espaço extra para não ser coberto pelo footer
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    // Sombra para a imagem
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  imagem: {
    width: 200,
    height: 300,
    borderRadius: 12,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  autor: {
    fontSize: 16,
    color: '#555',
    marginBottom: 12,
  },
  preco: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    width: '100%',
    marginVertical: 10,
  },
  descricaoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  descricao: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24, // Melhora a legibilidade
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 30, // Espaço para a barra de gestos do celular
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // Botão secundário (outline)
  botaoFavorito: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  textoBotaoFavorito: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  // Botão primário (preenchido)
  botaoComprar: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    flex: 1,
    marginLeft: 15,
    alignItems: 'center',
  },
  textoBotaoComprar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});