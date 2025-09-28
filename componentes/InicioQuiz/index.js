import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { obtemTodosTemas, obtemPerguntasPorTema } from '../../services/dbservice';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';
import theme from '../../theme';

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
    navigation.navigate('Quiz', { temaId, qtd });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Iniciar Quiz</Text>
        
        <Text style={styles.label}>Tema</Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={temaId}
            onValueChange={setTemaId}
            style={{color: theme.colors.text.primary}}
          >
            <Picker.Item label="Selecione um tema" value="" color={theme.colors.text.disabled} />
            {temas.map(t => (
              <Picker.Item 
                key={t.id} 
                label={`${t.nome}`} 
                value={t.id} 
                color={theme.colors.text.primary}
              />
            ))}
          </Picker>
        </View>

        <Text style={[styles.label, styles.infoText]}>Perguntas disponíveis: {qtdDisponivel}</Text>
        
        <Text style={styles.label}>Quantidade de perguntas</Text>
        <TextInput
          style={styles.input}
          value={qtdPerguntas}
          onChangeText={setQtdPerguntas}
          keyboardType="numeric"
          placeholder="Digite a quantidade de perguntas"
          placeholderTextColor={theme.colors.text.disabled}
        />
        
        <TouchableOpacity style={styles.button} onPress={iniciarQuiz}>
          <Text style={styles.buttonText}>Iniciar Quiz</Text>
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