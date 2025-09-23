import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { obtemTodosTemas, obtemPerguntasPorTema } from '../services/dbservice';
import { Picker } from '@react-native-picker/picker';

export default function InicioQuiz({ navigation }) {
  const [temas, setTemas] = useState([]);
  const [temaId, setTemaId] = useState('');
  const [qtdPerguntas, setQtdPerguntas] = useState('');
  const [qtdDisponivel, setQtdDisponivel] = useState(0);

  useEffect(() => {
    async function carregarTemas() {
      const lista = await obtemTodosTemas();
      setTemas(lista);
    }
    carregarTemas();
  }, []);

  useEffect(() => {
    async function carregarQtdPerguntas() {
      if (temaId) {
        const perguntas = await obtemPerguntasPorTema(temaId);
        setQtdDisponivel(perguntas.length);
      } else {
        setQtdDisponivel(0);
      }
    }
    carregarQtdPerguntas();
  }, [temaId]);

  const iniciarQuiz = () => {
    const qtd = parseInt(qtdPerguntas);
    if (!temaId) {
      Alert.alert('Erro', 'Selecione um tema.');
      return;
    }
    if (!qtd || qtd < 1) {
      Alert.alert('Erro', 'Informe uma quantidade válida de perguntas.');
      return;
    }
    if (qtd > qtdDisponivel) {
      Alert.alert('Erro', 'Quantidade de perguntas maior que o disponível para o tema.');
      return;
    }
    // Navegar para tela do quiz, passando temaId e qtd
    navigation.navigate('Quiz', { temaId, qtd });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tema:</Text>
      <Picker
        selectedValue={temaId}
        style={styles.picker}
        onValueChange={setTemaId}
      >
        <Picker.Item label="Selecione" value="" />
        {temas.map(t => (
          <Picker.Item key={t.id} label={`${t.nome} (${t.qtd || ''})`} value={t.id} />
        ))}
      </Picker>
      <Text style={styles.label}>Perguntas disponíveis: {qtdDisponivel}</Text>
      <Text style={styles.label}>Quantidade de perguntas para jogar:</Text>
      <TextInput
        style={styles.input}
        value={qtdPerguntas}
        onChangeText={setQtdPerguntas}
        keyboardType="numeric"
        placeholder="Digite a quantidade"
      />
      <Button title="Iniciar Quiz" onPress={iniciarQuiz} />
      <Button title="Voltar ao Menu" onPress={() => navigation.navigate('Menu')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
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
