import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { adicionaTema } from '../services/dbservice';

export default function CadastroTema() {
  const [nome, setNome] = useState('');

  const salvarTema = async () => {
    if (!nome.trim()) {
      Alert.alert('Erro', 'Informe o nome do tema.');
      return;
    }
    try {
      const sucesso = await adicionaTema(nome.trim());
      if (sucesso) {
        Alert.alert('Sucesso', 'Tema cadastrado com sucesso!');
        setNome('');
      } else {
        Alert.alert('Erro', 'Não foi possível cadastrar o tema.');
      }
    } catch (e) {
      Alert.alert('Erro', 'Tema já existe ou houve um erro.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Tema:</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Digite o nome do tema"
      />
      <Button title="Salvar Tema" onPress={salvarTema} />
      <Button title="Voltar ao Menu" onPress={() => typeof navigation !== 'undefined' && navigation.navigate ? navigation.navigate('Menu') : null} />
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
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 20,
  },
});
