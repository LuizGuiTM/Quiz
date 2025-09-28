import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { adicionaTema } from '../../services/dbservice';
import styles from './styles';

export default function CadastroTema({ navigation }) {
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
      <View style={styles.content}>
        <Text style={styles.title}>Cadastro de Tema</Text>
        <Text style={styles.label}>Nome do Tema</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Digite o nome do tema"
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.button} onPress={salvarTema}>
          <Text style={styles.buttonText}>Salvar Tema</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.secondaryButton} 
          onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Menu' }] })}
        >
          <Text style={styles.secondaryButtonText}>Voltar ao Menu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}