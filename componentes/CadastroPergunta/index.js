import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { obtemTodosTemas, adicionaPergunta, adicionaAlternativa } from '../../services/dbservice';
import styles from './styles';
import theme from '../../theme';

export default function CadastroPergunta({ navigation }) {
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
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Nova Pergunta</Text>
        
        <Text style={styles.label}>Tema</Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={temaId}
            onValueChange={setTemaId}
            style={{color: theme.colors.text.primary}}
          >
            <Picker.Item label="Selecione um tema" value="" color={theme.colors.text.disabled} />
            {temas.map(t => (
              <Picker.Item key={t.id} label={t.nome} value={t.id} color={theme.colors.text.primary} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Pergunta</Text>
        <TextInput
          style={styles.input}
          value={textoPergunta}
          onChangeText={setTextoPergunta}
          placeholder="Digite a pergunta"
          placeholderTextColor={theme.colors.text.disabled}
          multiline
        />

        <Text style={styles.label}>Alternativas</Text>
        {alternativas.map((alt, idx) => (
          <View key={idx} style={styles.altContainer}>
            <TextInput
              style={styles.altInput}
              value={alt}
              onChangeText={v => handleAlternativaChange(idx, v)}
              placeholder={`Alternativa ${idx + 1}`}
              placeholderTextColor={theme.colors.text.disabled}
            />
            <View style={styles.radioContainer}>
              <TouchableOpacity
                style={[styles.radio, correta === idx && styles.radioSelected]}
                onPress={() => setCorreta(idx)}
              >
                <Text style={{color: correta === idx ? theme.colors.text.onPrimary : 'transparent'}}>✓</Text>
              </TouchableOpacity>
              <Text style={styles.radioLabel}>Correta</Text>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.button} onPress={salvarPergunta}>
          <Text style={styles.buttonText}>Salvar Pergunta</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Menu' }] })}
        >
          <Text style={styles.secondaryButtonText}>Voltar ao Menu</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}