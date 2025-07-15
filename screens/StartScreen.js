// screens/StartScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

export default function StartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <Text style={styles.emoji}>📚</Text>
        <Text style={styles.title}>Bem-vindo ao Book++</Text>
        <Text style={styles.subtitle}>
          Sua porta de entrada para o mundo da leitura.
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Começar a explorar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f5f2', // Um branco "quente", mais suave
    justifyContent: 'space-between', // Empurra o conteúdo e o botão para as extremidades
    alignItems: 'center',
    padding: 50,
    paddingBottom: 50, // Mais espaço na parte inferior
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    maxWidth: '80%', // Evita que o texto fique muito largo em telas grandes
  },
  button: {
    backgroundColor: '#007AFF', // Um azul vibrante e moderno
    paddingVertical: 15,
    borderRadius: 30, // Bordas bem arredondadas
    width: '100%',
    alignItems: 'center',
    // Sombra para dar profundidade
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Elevação para Android
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});