import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { adicionaTema, obtemTemaPorId, atualizaTema } from '../../services/dbservice';
import styles from './styles';

export default function CadastroTema({ navigation, route }) {
  const [nome, setNome] = useState('');
  const [modoEdicao, setModoEdicao] = useState(false);
  const [temaId, setTemaId] = useState(null);

  useEffect(() => {
    async function carregarTemaEdicao() {
      if (route?.params?.temaId) {
        setModoEdicao(true);
        setTemaId(route.params.temaId);
        try {
          const tema = await obtemTemaPorId(route.params.temaId);
          if (tema) setNome(tema.nome);
        } catch (e) {
          Alert.alert('Erro', 'Falha ao carregar tema para edição.');
        }
      }
    }
    carregarTemaEdicao();
  }, [route?.params?.temaId]);

  const salvarTema = async () => {
    if (!nome.trim()) {
      Alert.alert('Erro', 'Informe o nome do tema.');
      return;
    }
    try {
      let sucesso = false;
      if (modoEdicao && temaId) {
        sucesso = await atualizaTema(temaId, nome.trim());
      } else {
        sucesso = await adicionaTema(nome.trim());
      }
      if (sucesso) {
        Alert.alert('Sucesso', modoEdicao ? 'Tema atualizado com sucesso!' : 'Tema cadastrado com sucesso!');
        setNome('');
        navigation.goBack();
      } else {
        Alert.alert('Erro', modoEdicao ? 'Não foi possível atualizar o tema.' : 'Não foi possível cadastrar o tema.');
      }
    } catch (e) {
      Alert.alert('Erro', 'Tema já existe ou houve um erro.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{modoEdicao ? 'Editar Tema' : 'Cadastro de Tema'}</Text>
        <Text style={styles.label}>Nome do Tema</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Digite o nome do tema"
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.button} onPress={salvarTema}>
          <Text style={styles.buttonText}>{modoEdicao ? 'Salvar Alterações' : 'Salvar Tema'}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.secondaryButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}