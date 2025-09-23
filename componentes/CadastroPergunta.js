import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { obtemTodosTemas, adicionaPergunta, adicionaAlternativa } from '../services/dbservice';
export default function CadastroPergunta() {
  const [temas, setTemas] = useState([]);
  const [temaId, setTemaId] = useState('');
  const [textoPergunta, setTextoPergunta] = useState('');
  const [alternativas, setAlternativas] = useState(['', '', '', '']);
  const [correta, setCorreta] = useState(null);

  useEffect(() => {
    async function carregarTemas() {
      const lista = await obtemTodosTemas();
      setTemas(lista);
    }
    carregarTemas();
  }, []);

  const handleAlternativaChange = (index, value) => {
    const novas = [...alternativas];
    novas[index] = value;
    setAlternativas(novas);
  };

  const salvarPergunta = async () => {
    if (!temaId) {
      Alert.alert('Erro', 'Selecione um tema.');
      return;
    }
    if (!textoPergunta.trim()) {
      Alert.alert('Erro', 'Informe o texto da pergunta.');
      return;
    }
    if (alternativas.some(a => !a.trim())) {
      Alert.alert('Erro', 'Preencha todas as alternativas.');
      return;
    }
    if (correta === null) {
      Alert.alert('Erro', 'Selecione a alternativa correta.');
      return;
    }
    try {
      const perguntaId = await adicionaPergunta(textoPergunta.trim(), parseInt(temaId));
      for (let i = 0; i < 4; i++) {
        await adicionaAlternativa(alternativas[i].trim(), i === correta, perguntaId);
      }
      Alert.alert('Sucesso', 'Pergunta cadastrada com sucesso!');
      setTextoPergunta('');
      setAlternativas(['', '', '', '']);
      setCorreta(null);
    } catch (e) {
      Alert.alert('Erro', `Não foi possível cadastrar a pergunta.\n${e?.message || e}`);
    }
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
          <Picker.Item key={t.id} label={t.nome} value={t.id} />
        ))}
      </Picker>
      <Text style={styles.label}>Pergunta:</Text>
      <TextInput
        style={styles.input}
        value={textoPergunta}
        onChangeText={setTextoPergunta}
        placeholder="Digite a pergunta"
      />
      <Text style={styles.label}>Alternativas:</Text>
      {alternativas.map((alt, idx) => (
        <View key={idx} style={styles.altContainer}>
          <TextInput
            style={styles.altInput}
            value={alt}
            onChangeText={v => handleAlternativaChange(idx, v)}
            placeholder={`Alternativa ${idx + 1}`}
          />
          <TouchableOpacity
            style={[styles.radio, correta === idx && styles.radioSelected]}
            onPress={() => setCorreta(idx)}
          >
            <Text>{correta === idx ? '✔' : ''}</Text>
          </TouchableOpacity>
          <Text>Correta</Text>
        </View>
      ))}
      <Button title="Salvar Pergunta" onPress={salvarPergunta} />
      <Button title="Voltar ao Menu" onPress={() => typeof navigation !== 'undefined' && navigation.navigate ? navigation.navigate('Menu') : null} />
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
  altContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  altInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '60%',
    marginRight: 10,
  },
  radio: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#888',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  radioSelected: {
    backgroundColor: '#aaf',
    borderColor: '#00f',
  },
});
