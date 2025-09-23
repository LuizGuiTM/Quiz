import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';

export default function Menu({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sistema de Quiz</Text>
      <Button title="Cadastro de Temas" onPress={() => navigation.navigate('CadastroTema')} />
      <Button title="Cadastro de Perguntas" onPress={() => navigation.navigate('CadastroPergunta')} />
      <Button title="Iniciar Quiz" onPress={() => navigation.navigate('InicioQuiz')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
});
